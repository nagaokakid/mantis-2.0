export class Ajax
{
    // GET request
    static async get(url: string, customHeaders?: HeadersInit): Promise<any>
    {
        try
        {
            const response = await fetch(url, {
                method: 'GET',
                headers: customHeaders
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
                headers: customHeaders
            })

            return response;
        } 
        catch (error: any) {
            console.error("DELETE request failed.")
            throw error;
        }
    }
}
