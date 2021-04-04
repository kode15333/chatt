import { auth } from "../services/firebase";

export function singup(email: string, password: string) {
    return auth().createUserWithEmailAndPassword(email, password);
}

export function singin(email:string, password:string) {
    return auth().signInWithEmailAndPassword(email, password);
}

export function singInWithGoogle() {
    const provider = new auth.GoogleAuthProvider();
    return auth().signInWithPopup(provider);
}
export function singWithGitHub() {
    const provider = new auth.GithubAuthProvider();
    return auth().signInWithPopup(provider);
}

export function logout() {
    return auth().signOut()
}
