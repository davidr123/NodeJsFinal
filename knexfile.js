module.exports={
    development: {
        client: 'postgresql',
        connection: 
        'postgress://postgres:postgres@localhost:5432/Rompecabeza'
    },
    production: {
        client: "postgresql",
        connection: process.env.DATABASE_URL + '?ssl=true'
    }
};

