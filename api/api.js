const url = "http://localhost:8080";

export async function apiFetch({path, methodType, headerData = {}, bodyData}){
    let body = bodyData;
    const headers = {...headerData};

    if (bodyData && !(bodyData instanceof FormData)){
        body = JSON.stringify(bodyData);
        headers['Content-Type'] = 'application/json';
    }

    const fetchOptions = {
        method: methodType, 
        credentials: "include",
        headers: headers,
        body: body
    }

    //console.log(url + path);
    //console.log(fetchOptions);

    const res = await fetch(url + path, fetchOptions);

    let data = null;
    let error = null;
    try{
        data = await res.json();
    } catch(e){
        error = e;
    }
    return {"success": res.ok, "data": data, "error": error};
}