const _apiBase = 'https://api.escuelajs.co/api/v1/';

const requestWithoutHook = async (url, method = 'GET', body = null, headers = {}) => {
    try {
        const response = await fetch(url, {method, body, headers});

        if (!response.ok) {
            throw new Error(`Something went wrong ${url}, status: ${response.status}`)
        }

        const data = await response.json();

        return data;
    } catch(e) {
        throw e;
    }
};

export const login = async (email, password) => {
    const body = JSON.stringify({ email, password });
    const res = await requestWithoutHook(`${_apiBase}auth/login`, 'POST', body, {
        'Content-Type': 'application/json' 
    });
    return res;
};


export const getUserProfile = async (token) => {
    const res = await requestWithoutHook(`${_apiBase}auth/profile`, 'GET', null, {
        'Authorization': `Bearer ${token}`
    });
    return res;
};


export const createUser = async (name, email, password, avatar) => {
    const body = JSON.stringify({name, email, password, avatar});
    const res = await requestWithoutHook(`${_apiBase}users/`, 'POST', body, {
        'Content-Type': 'application/json'
    });
    return res;
}

export const updateUser = async (data, id, token) => {
    const body = JSON.stringify(data);

    console.log(body);

    const res = await requestWithoutHook(`${_apiBase}users/${id}`, 'PUT', body, {
        'Content-Type': 'application/json', 
        'Authorization': `Bearer ${token}`
    });

    return res;
}