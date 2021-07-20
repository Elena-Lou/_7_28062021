export default function authHeaders(vm) {
  console.log(this);
  const token = vm.$store.state.token;
  const user = vm.$store.state.user;

  if (user && token) {
    // for Node.js Express back-end
    return { "x-access-token": token };
  } else {
    return { message: "l'authentification a échoué" };
  }
}
