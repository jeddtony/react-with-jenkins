import React, {createContext, useContext} from 'react';
import Api from '../api/api';

const ApiContext = createContext();

const ApiProvider = ({children}) => {

    return (
        <ApiContext.Provider value={Api}>
            {children}
        </ApiContext.Provider>
    )
}

const useApi = () => {
    const context = useContext(ApiContext);

    if(context === undefined){
        throw new Error('useApi must be used within a ApiProvider');
    }

    return context;
}

export {ApiProvider, useApi}