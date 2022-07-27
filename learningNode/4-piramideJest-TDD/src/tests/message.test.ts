import axios from "axios"

const server = axios.create({
    baseURL: 'http://localhost:8000/'
})


describe('/', () => {
    it('deve retornar a msg de boas vindas', async () =>{
        const response = await server.get('/')

        expect(response.status).toBe(200)
        expect(response.data).toMatchObject({message: 'Welcome to TestsAPI'})

    })

})