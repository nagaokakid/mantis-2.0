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

            if (!response.ok)
            {
                throw new Error(`Server responded with HTTP error: ${response.status}`);
            }

            return await response.json();
        }
        catch (error: any)
        {
            throw new Error(`GET request failed. ${error.message}`);
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

            if (!response.ok)
            {
                throw new Error(`Server responded with HTTP error: ${response.status}`);
            }

            return await response.json();
        } 
        catch (error: any) 
        {
            throw new Error(`POST request failed. ${error.message}`);
        }
    }

    // PUT request
    static async put(url: string, data: object, customHeaders?: HeadersInit): Promise<any>
    {
        try {
            const response = await fetch(url, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    ...customHeaders
                },
                body: JSON.stringify(data)
            })

            if (!response.ok)
            {
                throw new Error(`Server responded with HTTP error: ${response.status}`);
            }

            return await response.json();
        } 
        catch (error: any) {
            throw new Error(`PUT request failed. ${error.message}`);
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

            if (!response.ok)
            {
                throw new Error(`Server responded with HTTP error: ${response.status}`);
            }

            return await response.json();
        } 
        catch (error: any) {
            throw new Error(`DELETE request failed. ${error.message}`);
        }
    }
}
