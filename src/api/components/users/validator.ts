export const Validator = {
    schema: {
        body: {
            type: 'object',
            required: ['userid' ,'username', 'email', 'name', 'hasNotification'],
            properties: {
                userid: { type: 'number' },
                username: { type: 'string' },
                email: { type: 'string' },
                name: { 
                    type: 'object',
                    required: ['firstname', 'lastname'],
                    properties: {
                        firstname: { type: 'string' },
                        lastname: { type: 'string' }
                    }
                },
                hasNotification: { type: 'boolean' }
            }
        }
    }
}