import {useState, useEffect} from 'react';
import {useApi} from '../context/ApiContext';

export function useFetch(props) {
    let api = useApi();

    const [isLoading, setIsLoading] = useState(false);
    const [users, setUsers] = useState([]);
    const [totalCount, setTotalCount] = useState(0);
    const [hasError, setHasError] = useState();

    const sampleData = [
        {
            login: "First Login",
            avatar_url: "https://avatars.githubusercontent.com/u/9919?v=4",
            type: "Organization"
        },
        {
            login: "First Login",
            avatar_url: "https://avatars.githubusercontent.com/u/9919?v=4",
            type: "Organization"
        },
        {
            login: "First Login",
            avatar_url: "https://avatars.githubusercontent.com/u/9919?v=4",
            type: "Organization"
        },
        {
            login: "First Login",
            avatar_url: "https://avatars.githubusercontent.com/u/9919?v=4",
            type: "Organization"
        }
    ]

    useEffect(() => {
        const fetchData = async() => {
            setIsLoading(true)
            setHasError(false);
            let results = null;

                results = await api.getUsers(props.query, props.page);
                console.log(results);
                let {success} = results;
            setIsLoading(false);

            if(success) {
                let {data} = results;
                    setUsers(data.items)
                    setTotalCount(data.total_count);
            } 
            else {
                let {message} = results;
                setHasError(message);
            } 
        }
        if(props.query.length > 0){
            fetchData();
        }
        return () => { 
            return [users, isLoading, hasError ]
        }
    }, [props.query, props.page])

    return {users, totalCount, isLoading, hasError}
}