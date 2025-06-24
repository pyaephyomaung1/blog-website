import { AuthService } from "../services";
import { Request, Response } from "express";

const authService = new AuthService();

export class AuthController {
  async login(req: Request, res: Response) {
    try {
      const { username, password } = req.body;
      if (!username || !password) {
        return res
          .status(400)
          .json({ message: "Username and password are required." });
      }
      const token = await authService.login(username, password);
      res.status(200).json({
        message: "Login successful",
        token: token,
      });
    } catch (error: any) {
      console.error("Login error:", error);
      // Specific error handling for invalid credentials
      if (error.message === "Invalid credentials") {
        return res
          .status(401)
          .json({ message: "Invalid username or password." }); // 401 Unauthorized
      }
      res.status(500).json({ message: "Login failed", error: error.message });
    }
  }
}
