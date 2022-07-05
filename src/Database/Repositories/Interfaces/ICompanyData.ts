export interface CompanyData{ 
            message: string,
            data: {
                name: string,
                cnpj: string,
                email: string,
                password: string,
                id: string
            },
            hasError: boolean
}