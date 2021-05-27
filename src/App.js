import { useEffect,  useRef,  useState } from 'react';
import './App.css';

const characters ='ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

function generateString(length) {
    let result = '';
    const charactersLength = characters.length;
    for ( let i = 0; i < length; i++ ) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }

    return result;
}

function App() {
  const [state, setState] = useState(false);
  const ref = useRef(null);

  const requestNonce = generateString(60);
  const partnerKey = 'xjXaOc567471c4f3a4198a864b5c5f7f60d4f';
  const truecallerDeeplink = `truecallersdk://truesdk/web_verify?type=btmsheet\
&requestNonce=${requestNonce.trim()}\
&partnerKey=${partnerKey}\
&partnerName=Instamojo\
&lang=en\
&privacyUrl=${encodeURIComponent("https://www.instamojo.com/company/privacy/")}\
&termsUrl=${encodeURIComponent("https://www.instamojo.com/company/terms/")}\
&loginPrefix=getstarted\
&loginSuffix=verifymobile\
&ctaPrefix=use\
&ctaColor=%234e4e91\
&btnShape=round\
&skipOption=useanothermethod`

  const invokeTruecaller = () => {
    // window.location = "http://google.com";
    setTimeout(function() {
      if(document.hasFocus() ){
          setState(false)
      }else{
        setState(true)
      }
    }, 600);
    window.location = truecallerDeeplink;
  }

  useEffect(() => {
    setTimeout(() => {
      ref.current.dispatchEvent(new MouseEvent("click", {bubbles: false, cancelable: false, view: window}))
    }, 1000)
  }, [])

  return (
    <div className="App">
      {
        state ? "Truecaller Found": "Truecaller Not Found"
      }
      {requestNonce}
      <br />
      {
        truecallerDeeplink
      }
      <button ref={ref} onClick={invokeTruecaller}>Invoke flow</button>
      {/* <InnerHTML html={script}></InnerHTML> */}
    </div>
  );
}

export default App;
