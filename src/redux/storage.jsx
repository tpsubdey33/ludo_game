import {MMKV} from 'react-native-mmkv'

const Storage=new MMKV()
const reduxStorage={
    setItem:(key,value)=>{
        Storage.set(key,value);
        return Promise.resolve(true);
    },
    getItem:(key)=>{
       const value= Storage.getString(key,value);
        return Promise.resolve(value);
    },
    removeItem:(key)=>{
        Storage.delete(key);
        return Promise.resolve();
    },
};
export default reduxStorage;