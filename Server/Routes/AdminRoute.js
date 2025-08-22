import express from "express";
import con from '../utils/db.js'
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import multer from "multer";
import path from "path";

const router = express.Router();
router.post("/adminlogin", (req, res) => {
    const sql = "SELECT * from admin where email = ? and password = ?"
    con.query(sql, [req.body.email, req.body.password], (err, result) => {
        if (err) return res.json({ loginStatus: false, Error: "incorrect credentials" })
        if (result.length > 0) {
            const email = result[0].email;
            const token = jwt.sign(
                { role: "admin", email: email },
                "jwt_secret_key",
                { expiresIn: "1d" });
            res.cookie('token', token)
            return res.json({ loginStatus: true });
        } else {
            return res.json({ loginStatus: false, Error: "incorrect credentials" });
        }
    });
});
router.post("/signup", (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.json({ Error: "Email and password are required" });
  }

  const checkSql = "SELECT * FROM admin WHERE email = ?";
  con.query(checkSql, [email], (err, result) => {
    if (err) {
      console.error("Signup check error:", err);
      return res.json({ Error: "Database error" });
    }

    if (result.length > 0) {
      return res.json({ Error: "Email already registered" });
    }
    bcrypt.hash(password, 10, (err, hashedPassword) => {
      if (err) {
        console.error("Hashing error:", err);
        return res.json({ Error: "Error hashing password" });
      }
      const insertSql = "INSERT INTO admin (email, password) VALUES (?, ?)";
      con.query(insertSql, [email, hashedPassword], (err, insertResult) => {
        if (err) {
          console.error("Insert error:", err);
          return res.json({ Error: "Database insert error" });
        }

        return res.json({
          success: true,
          message: "User registered successfully",
        });
      });
    });
  });
});

router.get('/category', (req, res) => {
    const sql = "SELECT * FROM category";
    con.query(sql, (err, result) => {
        if(err) return res.json({Status: false, Error: "Query Error"})
        return res.json({Status: true, Result: result})
    })
})

router.post("/add_category", (req, res) => {
    const sql = "INSERT INTO category (name) VALUES (?)";
    con.query(sql, [req.body.category], (err, result) => {
        if (err) return res.json({ Status: false, Error: "Query Error" })
        return res.json({ Status: true, });
    })
})

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'Public/Images')
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + "_" + Date.now() + path.extname(file.originalname))
    }
})
const upload = multer({
    storage: storage
})

router.post('/add_employee',upload.single('image') ,(req, res) => {
    const sql = "INSERT INTO employee(name, email, password,category_id,image)VALUES(?)";
    bcrypt.hash(req.body.password.toString(), 10, (err, hash) => {
        if (err) return res.json({ Status: false, Error: " Query Error:" })
        const values = [
            req.body.name,
            req.body.email,
            hash,
            req.body.category_id,
            req.file.filename
        ]
        con.query(sql, [values], (err, result) => {
            if (err) return res.json({ Status: false, Error: err})
            return res.json({ Status: true })
        })
    })
})   
router.get('/employee', (req, res) => {
     const sql = `
        SELECT 
            employee.id, 
            employee.name, 
            employee.email, 
            employee.image, 
            category.name AS category_name 
        FROM employee 
        JOIN category ON employee.category_id = category.id
    `;
    con.query(sql, (err, result) => {
        if(err) return res.json({Status: false, Error: "Query Error"})
        return res.json({Status: true, Result: result})
    })
})
router.get('/employee/:id', (req, res) => {
    const id = req.params.id;
    const sql = "SELECT * FROM employee WHERE id = ?";
    con.query(sql,[id], (err, result) => {
        if(err) return res.json({Status: false, Error: "Query Error"})
        return res.json({Status: true, Result: result})
    })
})
router.put('/edit_employee/:id', (req, res) => {
    const id = req.params.id;
    const sql = `UPDATE employee 
        set name = ?, email = ?,  category_id = ? 
        Where id = ?`
    const values = [
        req.body.name,
        req.body.email,
        req.body.category_id,
        req.params.id
    ]
    con.query(sql,[...values, id], (err, result) => {
        if(err) return res.json({Status: false, Error: "Query Error"+err})
        return res.json({Status: true, Result: result})
    })
})
router.delete('/delete_employee/:id', (req, res) => {
    const id = req.params.id;
    const sql = "DELETE from employee where id = ?"
    con.query(sql,[id], (err, result) => {
        if(err) return res.json({Status: false, Error: "Query Error"+err})
        return res.json({Status: true, Result: result})
    })
})
router.get('/admin_count', (req, res) => {
    const sql = "select count(id) as admin from admin";
    con.query(sql, (err, result) => {
        if(err) return res.json({Status: false, Error: "Query Error"+err})
        return res.json({Status: true, Result: result})
    })
})
router.get('/employee_count', (req, res) => {
    const sql = "select count(id) as employee from employee";
    con.query(sql, (err, result) => {
        if(err) return res.json({Status: false, Error: "Query Error"+err})
        return res.json({Status: true, Result: result})
    })
})
router.get('/category_count', (req, res) => {
    const sql = "select count(id) as category from category";
    con.query(sql, (err, result) => {
        if(err) return res.json({Status: false, Error: "Query Error"+err})
        return res.json({Status: true, Result: result})
    })
})

router.get('/admin_records', (req, res) => {
    const sql = "select * from admin"
    con.query(sql, (err, result) => {
        if(err) return res.json({Status: false, Error: "Query Error"+err})
        return res.json({Status: true, Result: result})
    })
})
router.get('/logout', (req, res) => {
    res.clearCookie('token')
    return res.json({Status: true})
})


// Asset routes
// router.post('/add_asset', upload.none(), (req, res) => {
//     console.log("Received asset:", req.body);
//     const sql =  `INSERT INTO assets
//     (asset_id, name, purchasedate, location, status, category_id) VALUES(?)`;
//     const values = [
//         req.body.asset_id,
//         req.body.name,
//         req.body.purchasedate,
//         req.body.location,
//         req.body.status,
//         req.body.category_id,
        
// ];
//     con.query(sql, [values], (err, result) => {
//         if (err) return res.json({ Status: false, Error: "Query Error" });
//         return res.json({ Status: true });
//     });
// });
router.post('/add_asset', upload.none(), (req, res) => {
    console.log("Received asset:", req.body);

    const sql = `INSERT INTO assets 
      (asset_id, name, purchasedate, location, status, category_id) 
      VALUES (?)`;

    const values = [
        req.body.asset_id,
        req.body.name,
        req.body.purchasedate,
        req.body.location,
        req.body.status,
        req.body.category_id,
    ];

    con.query(sql, [values], (err, result) => {
        if (err) {
            console.error("SQL Error:", err);
            return res.json({ Status: false, Error: "Query Error", SQL_Error: err.sqlMessage });
        }
        return res.json({ Status: true });
    });
});

router.get('/asset', (req, res) => {
     const sql = `
        SELECT 
            assets.asset_id, 
            assets.name, 
            assets.purchasedate,
            assets.location,
            assets.status,
            category.name AS category_name
            FROM assets
            JOIN category ON assets.category_id = category.id
    `;
    con.query(sql, (err, result) => {
        if(err) return res.json({Status: false, Error: "Query Error"})
        return res.json({Status: true, Result: result})
    })
})
router.get('/asset/:id', (req, res) => {
    const id = req.params.id;
    const sql = "SELECT * FROM assets WHERE asset_id = ?";
    con.query(sql,[id], (err, result) => {
        if(err) return res.json({Status: false, Error: "Query Error"})
        return res.json({Status: true, Result: result})
    })
})
router.put('/edit_asset/:asset_id', (req, res) => {
    const id = req.params.asset_id;
    const sql = `UPDATE assets 
        set name = ?, purchasedate = ?, location = ?, status = ?, category_id = ? 
        Where asset_id = ?`
    const values = [
        req.body.name,
        req.body.purchasedate,
        req.body.location,
        req.body.status,
        req.body.category_id,
        id,
        
    ]
    con.query(sql,values,(err, result) => {
        if(err) return res.json({Status: false, Error: "Query Error"+err})
        return res.json({Status: true, Result: result})
    })
})
router.delete('/delete_asset/:id', (req, res) => {
    const id = req.params.id;
    const sql = "DELETE from assets where asset_id = ?"
    con.query(sql,[id], (err, result) => {
        if(err) return res.json({Status: false, Error: "Query Error"+err})
        return res.json({Status: true, Result: result})
    })
})
router.get('/asset_count', (req, res) => {
    const sql = "select count(asset_id) as asset from assets";
    con.query(sql, (err, result) => {
        if(err) return res.json({Status: false, Error: "Query Error"+err})
        return res.json({Status: true, Result: result})
    })
})
router.get('/asset_maintenance_count', (req, res) => {
    const sql = "select count(asset_id) as asset from assets WHERE status = 'maintenance'";
    con.query(sql, (err, result) => {
        if(err) return res.json({Status: false, Error: "Query Error " + err});
        return res.json({Status: true, Result: result});
    });
});
router.get("/asset_distribution/category", (req, res) => {
  const sql = `
    SELECT c.name AS category, COUNT(a.asset_id) AS total
    FROM assets a
    JOIN category c ON a.category_id = c.id
    GROUP BY c.name
  `;
  con.query(sql, (err, result) => {
    if (err) return res.json({ Status: false, Error: err });
    return res.json({ Status: true, Result: result });
  });
});
router.get("/asset_distribution/name", (req, res) => {
  const sql = `
    SELECT name AS asset, COUNT(*) AS total
    FROM assets
    GROUP BY name
  `;
  con.query(sql, (err, result) => {
    if (err) return res.json({ Status: false, Error: err });
    return res.json({ Status: true, Result: result });
  });
});

router.delete('/delete_category/:id', (req, res) => {
    const id = req.params.id;
    const sql = "DELETE from category where id = ?"
    con.query(sql,[id], (err, result) => {
        if(err) return res.json({Status: false, Error: "Query Error"+err})
        return res.json({Status: true, Result: result})
    })
})
router.get('/category/:id', (req, res) => {
  const id = req.params.id;
  const sql = "SELECT * FROM category WHERE id = ?";
  con.query(sql, [id], (err, result) => {
    if (err) return res.json({ Status: false, Error: "Query Error: " + err });
    return res.json({ Status: true, Result: result });
  });
});
router.put('/edit_category/:id', (req, res) => {
  const id = req.params.id;
  const sql = "UPDATE category SET name = ? WHERE id = ?";
  con.query(sql, [req.body.name, id], (err, result) => {
    if (err) return res.json({ Status: false, Error: "Query Error: " + err });
    return res.json({ Status: true, Result: result });
  });
});

export { router as adminRouter };