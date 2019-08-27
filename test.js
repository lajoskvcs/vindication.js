var f = require('./vindication')

var s

var object = {
	firstName: 'Hajdú-Bihar',
	lastName: 'Smith',
	middleName: 'Huhh',
	salutation: 'Dr.',
	salary: 50000,
	roles: [ ':::manager', 'supermanager', 'kingmanager', 'ultramanager' ],
	address: {
		country: 'France',
		city: 'Paris',
		zipCode: 75009,
		street: 'Haussmann 40'
	},
	title: 'Magesty',
	digit: '1',
	registered: false,
	somedata: { hello: 'huh' },
	empty: ''
}

var rules = {
	firstName: { required: true, typeof: 'name' },
	lastName: { minlength: '1', typeof: 'alphanum' },
	middleName: { forbidden: true },
	salary: { min: 80000 },
	roles: { pattern: /^\w+$/ },
	empty: { required: true },
	salutation: function ( value ) {
		console.log('salutation....')
		return value !== 'Dr.'
	},
	digit: { length: 1 },
	hablaty: { required: true },
	address: {
		country: { minlength: 6, element: ['France'] },
		city: { equalto: {
			params: 'Monaco', condition: function ( value ) { return this.address.country === 'France' }
		} },
		zipCode: { range: [10000, 100000] },
		street: { length: '[5, 50]' }
	},
	papers: {
		id: { required: true }
	},
	title: [
		{ element: ['Lord'] },
		{ minlength: '5' },
		function ( value ) {
			return value === 'Sir'
		}
	],
	registered: {
		required: true
	},
	somedata: {
		required: true,
		hasKey: true,
		keyElement: [ 'hello' ]
	}
}

s = f.validate( object, rules )

console.log( '>>', s )

/*
s = f.validateAll( [object], rules )

console.log( s )

s = f.validate( '', { typeof: 'email' } )

console.log( s )

s = f.validate( { email: '' }, { email: { typeof: 'email' } } )

console.log( s )

s = f.validateValue( 'a@b.hu', 'thing.email', { thing: { email: { typeof: 'email' } } } )


let testVal = {
	fee: {
		side: { required: true, element: [ 'BUYER' ] }
	}
}
let testObj = {
	fee:
	{
		side: undefined
	}
}

console.log( f.validate( testObj, testVal ) )

console.log( f.validateByProto( { name: 'almafa', address: 'almafa' }, { address: 'almafa' } ) )


let Asset = {
	amount: 'ASS-X-2'
}
let AssetValidation = {
	amount: { required: false, typeof: 'name' }
}
console.log( f.validate( Asset, AssetValidation ) )
*/
