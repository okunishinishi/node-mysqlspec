data = { // Schema for in "my_db.TEST_SHOP" database.
    name: 'my_db.TEST_SHOP',
    properties: {
        id: {type: 'integer', maxLength: 5},
        article: {type: 'integer', maxLength: 4},
        dealer: {type: 'string', maxLength: 20},
        price: {type: 'number', maxLength: undefined}
    },
    required: ['id', 'article', 'dealer', 'price']
};