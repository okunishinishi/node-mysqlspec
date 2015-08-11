schema = { // Schemas for in "my_db" database.
    'TEST_SHOP': { // Schema for in "my_db.TEST_SHOP" table.
        name: 'my_db.TEST_SHOP',
        properties: {
            id: {type: 'integer', maxLength: 5},
            article: {type: 'integer', maxLength: 4},
            dealer: {type: 'string', maxLength: 20},
            price: {type: 'number'}
        },
        required: ['id', 'article', 'dealer', 'price'],
        additionalProperties: false
    },
    'TEST_PERSON':{
        /**...*/
    }
};