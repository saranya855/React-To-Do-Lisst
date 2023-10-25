 import { useRouter } from 'next/router';
import React from 'react';

const Error = () => {
const router = useRouter();
    
return(
    <div>
        <p>
            not found
        </p>
    </div>
  );
}

 export default Error;