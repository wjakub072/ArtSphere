export function validateEmail(text) {
  const re =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(text);
}

export function validatePostcode(text) {
<<<<<<< HEAD
  const re = /^[0-9]{2}-[0-9]{3}$/;
  return re.test(text);
}
=======
  const re =
    /^[0-9]{1,2}-[0-9]{1,3}$/
  return re.test(text)
}
>>>>>>> 2a409a2a7127c6170586dce913d334e1b1f341ca
