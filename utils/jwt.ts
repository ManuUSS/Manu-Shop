import jwt from 'jsonwebtoken';

export const signToken = ( _id:string, email:string ) => {

    if( !process.env.JWT_SECRET_SEED ) throw new Error('No hay semilla de JWT, revisar .ENV')

    return jwt.sign( { _id, email }, process.env.JWT_SECRET_SEED, { expiresIn: '30d' } )

}

export const isValidToken = ( token: string ):Promise<string> => {
    if( !process.env.JWT_SECRET_SEED ) {
        throw new Error('No hay semilla de JWT, revisar .ENV');
    } 

    if( token.length <= 10 ) {
        return Promise.reject('JWT No valido');
    }

    return new Promise( ( resolve, reject ) => {
        try {
            jwt.verify( token, process.env.JWT_SECRET_SEED || '', ( error, payload ) => {
                if( error ) return reject('JWT No valido');

                const { _id } = payload as { _id: string };

                resolve( _id );
            })
        } catch (error) {
            reject('JWT No valido');
        }
    })
}