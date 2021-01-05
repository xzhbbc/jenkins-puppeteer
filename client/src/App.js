import {useEffect, useState} from "react";
import request from "./utils/request";
import './App.css'
import InputContainer from "./component/input-container";

function App() {
    const [address, setAddress] = useState('');
    const [user, setUser] = useState('');
    const [pwd, setPwd] = useState('');
    const [content, setContent] = useState('');
    const [result, setResult] = useState([]);
    // useEffect(() => {
    //     getData();
    // }, [])

    const getData = async () => {
        const data = await request.get('/handler/test')
        console.log(data);
    }

    const submit = async () => {
        const contentList = content.split(/[\r\n]/g);
        if (!address) {
            alert('请输入操作地址')
            return;
        }
        if (!user || !pwd) {
            alert('请输入操作帐号或密码')
            return;
        }
        if (!contentList || contentList.length === 0) {
            alert('请输入至少输入一个构建的项目')
            return;
        }
        const setData = await request.post('/handler/setJest', {
            address, user, pwd, list: contentList
        })
        console.log(setData)
        if (setData.data && setData.data.code === 1) {
            setResult(setData.data.body)
        }
    }

    return (
        <div className="container">
            <h2>自动化操作jenkins</h2>
            <InputContainer
                label={'输入操作地址'}
                value={address}
                changeCallBack={(val) => {
                    setAddress(val);
                }}
            />
            <InputContainer
                label={'输入操作帐号'}
                value={user}
                changeCallBack={(val) => {
                    setUser(val);
                }}
                noBorder={true}
            />
            <InputContainer
                label={'输入操作密码'}
                value={pwd}
                changeCallBack={(val) => {
                    setPwd(val);
                }}
                type={'password'}
            />
            <div className="input-container">
                <div className="text">需要构建的项目：</div>
                <textarea className="textArea" value={content} onChange={(e) => {
                    setContent(e.target.value);
                }}/>
            </div>
            <div className="btn" onClick={submit}>立即执行</div>
            {result && result.length > 0 && <div className="text-container">
                <div className="text">构建结果页：</div>
                {result.map(item => <div key={item} className="text">{item}</div>)}
            </div>}
        </div>
    );
}


export default App
