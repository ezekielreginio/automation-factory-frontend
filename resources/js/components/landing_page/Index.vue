<template>
    <div class="row h-100">
        <div class="col d-flex flex-column justify-content-center align-items-center w-100 px-md-5 px-2">
            <img src="https://cdn.1export.com/prod/public/images/logo/1export-2022/1Export+Logo.png" alt="1Export"
                class="logo">
            <h1 class="text-center text-uppercase header font-bolder font-size-28">Automation Factory</h1>
            <p class="text-secondary">Please log-in to your account</p>
            <form @submit.prevent="login" class="center-form form w-100">
                <div v-if="isInvalid" class="alert alert-danger">
                    <div>{{ errorMessage }}</div>
                </div>
                <div class="form-group mb-4">
                    <input v-model="formData.email" id="email" type="email" name="email" aria-describedby="emailHelp"
                        placeholder="Email" class="form-control unround-field form-auth">
                </div>
                <div class="form-group mb-4">
                    <input v-model="formData.password" id="password" type="password" name="password"
                        placeholder="Password" class="form-control unround-field form-auth">
                </div>
                <div class="form-group form-check d-flex justify-content-end flex-wrap">
                    <a :href="'/password/reset'" class="text-decoration-none">
                        <p class="zero-letter-spacing">
                            <span class="underline-hover">Forgot your password?</span>
                        </p>
                    </a>
                </div>
                <div class="d-flex flex-column justify-content-center"><button :disabled="isLoading" type="submit" id="btn-login"
                        class="btn rounded-0 light-green-button font-weight-400 px-5 mb-md-3 mx-auto">{{ loginStatus }}</button>
                </div>
            </form>
        </div>
        <div class="col">
            <img src="https://cdn.1export.com/prod/public/images/airplane_login.png" class="img-fluid">
        </div>
    </div>
</template>

<script>
    import UserService from '../../services/UserService.js';

    export default {
        data() {
            return {
                formData: {
                    email: null,
                    password: null,
                },
                isInvalid: false,
                isLoading: false,
                errorMessage: null
            }
        },
        computed: {
            loginStatus() {
                return this.isLoading ? 'Logging In...' : 'Log in'
            }
        },
        methods: {
            login() {
                this.isLoading = true;
                UserService.postLogin(this.formData)
                .then(res => {
                    let admin = UserService.checkUserAccess(res.data)
                    if (admin) {
                        location.replace('/dashboard')
                    } else {
                        this.setErrorMessage(401)
                    }
                })
                .catch((error) => {
                    this.setErrorMessage(error.response.status)
                })
                .finally(() => {
                    this.isLoading = false
                })
            },
            setErrorMessage(status) {
                this.isInvalid = true

                switch(status) {
                    case 401:
                        this.errorMessage = "These credentials do not match our records."
                        break;
                    default:
                        this.errorMessage = "Something went wrong. Please try again or contact support at support@1export.com."
                }
            }
        },
    }
</script>

<style scoped>

    .logo {
        max-width: 100%;
        width: auto;
        height: 130px;
    }
    .form-auth {
        border: none;
        border-bottom: thin solid #a7de7e;
        border-radius: 0;
    }
    .light-green-button {
        background-color: var(--light-green);
        border: 1.5px solid var(--light-green);
        color: #fff;
        transition: .25s ease-in-out;
    }
    .light-green-button:hover {
        background-color: transparent;
        color: var(--light-green);
    }
</style>