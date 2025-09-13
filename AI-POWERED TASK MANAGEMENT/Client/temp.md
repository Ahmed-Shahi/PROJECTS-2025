let user = []    
        const getData=async()=>{

            const response = await axios.get('http://localhost:8000/api/login');
            const data = response.data
            data.map((v,i)=>{
                // console.log(v.userName);
                
                user.push(v.userName)
                
            })
            console.log(user);
        }