const handleLogoutBtn = (req, res) => {

    res.clearCookie("token", {
        httpOnly: true,
        secure: false,   // true in production (HTTPS)
        sameSite: "lax"  // or "none" if cross-site
    });
    res.json({ message: "Logged out successfully" });
}

module.exports = {handleLogoutBtn}