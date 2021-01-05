const InputContainer = (props) => {
    const {label, value, changeCallBack, noBorder, type} = props;

    return (
        <div className={noBorder ? "input-container" : "input-container mgb"}>
            <div className="label">{label}：</div>
            <div className="input">
                <input className="input" type={type ? type : 'text'} value={value} onChange={(e) => {
                    changeCallBack(e.target.value);
                }}/>
            </div>
        </div>
    );
}

export default InputContainer
