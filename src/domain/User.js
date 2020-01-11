const User = (email, displayName, type="A", emailVerfied) =>{
    this.email = email;
    this.displayName = displayName;
    this.type = type;
    this.emailVerfied = emailVerfied;
}  

const deriveDisplayNameAndTypeFromValue = (value)=> {
    let displayName = value;
    let type="A";
    let i = value.indexOf("_|_");
        if (i>-1){
          displayName = value.substring(0,i);
          type = value.substring(value.length-1,value.length);
        }
        return {displayName,type};
}

const deriveValueFromDisplayNameAndType = (displayName, type="A") => {
    return displayName+"_|_"+type;
}

export default User;

export {deriveDisplayNameAndTypeFromValue, deriveValueFromDisplayNameAndType}