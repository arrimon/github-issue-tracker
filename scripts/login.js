// Loging Function done
document.getElementById('login-btn')
    .addEventListener('click', () =>{
            const inputName = document.getElementById('user-name').value;
            // console.log(inputName); // debugging user name
            
            const inputPassword = document.getElementById('user-password').value;
            // console.log(inputPassword); // debugging user password

            if(inputName == 'admin' && inputPassword == 'admin123'){
                alert('Loging Success');
                window.location.assign('main.html')
            }else{
                alert('Please input Correct Username & Password');
            }

        })