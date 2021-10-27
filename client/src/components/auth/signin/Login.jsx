import './login.css'
import { connect } from 'react-redux'
import { loginFromRedux } from '../../../redux/actions/auth'
import { useState } from 'react'

const actionRedux = {
    loginFromRedux
}

const Login = (props) => {

    const {loginFromRedux, history} = props

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const handelOnSubmit = e => {
        e.preventDefault()
        loginFromRedux({email, password})
        history.push('/home')
    }

    return(
        <div className="login-container">
            <div className="card-login">
                <form onSubmit={handelOnSubmit}>
                    <div className="form-inputs">
                        <label htmlFor="email" className='label'>Email:</label>
                        <input 
                            type="email" 
                            placeholder='Insert your email' 
                            className='input-email' 
                            value={email} 
                            onChange={(e)=>setEmail(e.target.value)} />
                    </div>
                    <div className="form-inputs">
                        <label htmlFor="password" className='label'>Password:</label>
                        <input 
                            type="password" 
                            placeholder='Insert your password' 
                            className='input-password'
                            value={password}
                            onChange={(e)=>setPassword(e.target.value)} />
                    </div>
                    <div className="send-credentials">
                        <button type='submit'>Login</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default connect(null, actionRedux)(Login)