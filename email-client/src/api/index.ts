
async function callEmailListApi(page = 1): Promise<PaginatedApiResponse<EmailDetails>> {

    const requestOptions = {
        method: "get",
    };

    try {
        const resp = await fetch(`https://flipkart-email-mock.vercel.app/?page=${page}`)
        const res = await resp.json();
        return {
            data: res.list,
            totalCount: res.total
        }
    } catch (err) {
        console.log('api error', err)
        throw err;
    }
}

async function getEmailContent(id: string): Promise<EmailContent> {

    try {
        const resp = await fetch(`https://flipkart-email-mock.vercel.app/?id=${id}`)
        const res = await resp.json();
        return res
    } catch (err) {
        console.log('api error', err)
        throw err;
    }
}

export {
    callEmailListApi,
    getEmailContent
}