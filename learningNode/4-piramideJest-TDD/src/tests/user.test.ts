import axios from "axios"

const server = axios.create({
    baseURL: 'http://localhost:8000'
})



describe('/user', () => {

    it('deve retornar 200', async () => {
        const user = await server.post('/user', {
            name: 'teste nome',
            email: 'teste@email.com'
        })

        expect(user.status).toBe(200)
    })
})