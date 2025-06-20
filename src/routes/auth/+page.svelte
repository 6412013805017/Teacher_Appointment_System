<!-- Login.svelte -->
<script>
    import { goto } from "$app/navigation";


    import { auth } from "$lib/timeSlots";

    let username = "";
    let password = "";
    let message = "";
    let loading = false;
    let userdata;

    async function login() {
        loading = true;
        try {
            const data = {
                username: username,
                password: password,
            };
            const result = await auth(data);
            if (result.success) {
                userdata = result.data.reverse(); // ล่าสุดก่อน
                console.log(userdata);
                goto('/Teacher_Appointment_System/teacher?teacher=' + userdata[0].teachername)
            }
        } catch (err) {
            message = "Error connecting to server";
            console.log("username: " + username + " password: " + password);
        } finally {
            loading = false;
        }
    }
</script>

<main>
    <div class="card">
        <h2>Login</h2>
        <input bind:value={username} placeholder="Username" />
        <input bind:value={password} type="password" placeholder="Password" />
        <button on:click={login} disabled={loading}>
            {loading ? "Logging in..." : "Login"}
        </button>
        {#if message}
            <p>{message}</p>
        {/if}
    </div>
</main>

<style>
    main {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 100vh;
        background: linear-gradient(to bottom right, #ece9e6, #ffffff);
        font-family: "Segoe UI", sans-serif;
    }

    .card {
        background: white;
        padding: 2rem;
        border-radius: 1rem;
        box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
        width: 300px;
        display: flex;
        flex-direction: column;
    }

    h2 {
        text-align: center;
        margin-bottom: 1.5rem;
    }

    input {
        flex: 1;
        padding: 0.7rem;
        margin-bottom: 1rem;
        border: 1px solid #ccc;
        border-radius: 0.5rem;
        font-size: 1rem;
    }

    button {
        width: 100%;
        padding: 0.7rem;
        background: #4a90e2;
        color: white;
        border: none;
        border-radius: 0.5rem;
        font-weight: bold;
        cursor: pointer;
        transition: background 0.3s;
    }

    button:hover {
        background: #357abd;
    }

    p {
        text-align: center;
        margin-top: 1rem;
        color: #666;
    }
</style>
