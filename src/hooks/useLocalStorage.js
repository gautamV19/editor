import {useState, useEffect} from 'react'

const PREFIX = '-code'

export default function useLocalStorage(key, initialValue) {
    const prefixedKey = PREFIX + key
    const [value, setValue] = useState(()=>{
        const jsonValue = localStorage.getItem(prefixedKey)
        if(jsonValue != null) return JSON.parse(jsonValue)
        if(initialValue instanceof Function){
            return initialValue()
        }
        return initialValue
    })
    
    useEffect(()=>{
        localStorage.setItem(prefixedKey, JSON.stringify(value))
    },[prefixedKey, value])
    
    return [value, setValue]
}
