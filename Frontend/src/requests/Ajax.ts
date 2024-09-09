export class Ajax
{
    static defaultHeaders: HeadersInit = {
        'Access-Control-Allow-Origin': '*',
    }
    // GET request
    static async get(url: string, customHeaders?: HeadersInit): Promise<any>
    {
        try
        {
            const response = await fetch(url, {
                method: 'GET',
                headers: {
                    ...this.defaultHeaders,
                    ...customHeaders
                }
            })
            
            return response;
        }
        catch (error: any)
        {
            console.error("GET request failed.");
            throw error;
        }
    }

    // POST request
    static async post(url: string, data: object, customHeaders?: HeadersInit): Promise<any>
    {
        try 
        {
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    ...this.defaultHeaders,
                    ...customHeaders
                },
                body: JSON.stringify(data)
            })

            return response;
        } 
        catch (error: any) 
        {
            console.error("POST request failed.");
            throw error;
        }
    }

    // PUT request
    static async put(url: string, data: object, customHeaders?: HeadersInit): Promise<any>
    {
        try 
        {
            const response = await fetch(url, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    ...this.defaultHeaders,
                    ...customHeaders
                },
                body: JSON.stringify(data)
            })

            return response;
        } 
        catch (error: any) 
        {
            console.error("PUT request failed.");
            throw error;
        }
    }

    // DELETE request
    static async delete(url: string, customHeaders?: HeadersInit): Promise<any>
    {
        try {
            const response = await fetch(url, {
                method: 'DELETE',
                headers: {
                    ...this.defaultHeaders,
                    ...customHeaders
                }
            })

            return response;
        } 
        catch (error: any) {
            console.error("DELETE request failed.")
            throw error;
        }
    }
}
