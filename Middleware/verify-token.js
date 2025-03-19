const verifyToken = (req, res, next) => {

    const header = req.headers['authorization'];
    const token = header && header.split('Bearer ')[1];
    
    if (!token) return res.status(403).send({ success: false, message: 'Notoken provided' });
        
        jwt.verify(token, process.env.SECRET, (err, decoded) => {
        
        if (err) return res.status(403).send({ success: false, message:
        
        'Invalid token' });
        req.user = {}
        req.user.id = decoded.iduser
        req.user.role = decoded.role
        next()
        })
        }
        
        module.exports = { verifyToken }