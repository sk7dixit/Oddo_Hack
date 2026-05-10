import { Request, Response } from "express";
import jwt from "jsonwebtoken";

export const adminLogin = async (
  req: Request,
  res: Response
) => {
  try {
    const { email, password } = req.body;

    if (
      email !== process.env.ADMIN_EMAIL ||
      password !== process.env.ADMIN_PASSWORD
    ) {
      return res.status(401).json({
        success: false,
        message: "Invalid credentials",
      });
    }

    const token = jwt.sign(
      {
        role: "admin",
        email,
      },
      process.env.JWT_SECRET as string,
      {
        expiresIn: "7d",
      }
    );

    return res.status(200).json({
      success: true,
      token,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

export const getDashboardStats = async (
  req: Request,
  res: Response
) => {
  try {
    const stats = {
      totalUsers: 120,
      totalTrips: 85,
      activeUsers: 43,
      publicTrips: 22,
      activeJournals: 56,
      revenue: 4520,

      monthlyGrowth: [
        { month: "Jan", users: 40 },
        { month: "Feb", users: 65 },
        { month: "Mar", users: 90 },
        { month: "Apr", users: 120 },
      ],

      tripStats: [
        { date: "May 01", count: 10 },
        { date: "May 02", count: 15 },
        { date: "May 03", count: 8 },
        { date: "May 04", count: 22 },
        { date: "May 05", count: 18 },
      ],

      topCities: [
        { city: "Paris", count: 22 },
        { city: "Tokyo", count: 18 },
        { city: "Dubai", count: 14 },
      ],
    };

    return res.status(200).json({
      success: true,
      data: stats,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to fetch stats",
    });
  }
};

export const getAllUsers = async (
  req: Request,
  res: Response
) => {
  try {
    const users = [
      {
        id: "1",
        name: "John Doe",
        email: "john@example.com",
        createdAt: "2026-05-10",
      },
      {
        id: "2",
        name: "Sarah Smith",
        email: "sarah@example.com",
        createdAt: "2026-05-11",
      },
    ];

    return res.status(200).json({
      success: true,
      data: users,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message:
        "Failed to fetch users",
    });
  }
};

export const deleteUser = async (
  req: Request,
  res: Response
) => {
  try {
    const { id } = req.params;

    return res.status(200).json({
      success: true,
      message: `User ${id} deleted`,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message:
        "Failed to delete user",
    });
  }
};

export const getAllTrips = async (
  req: Request,
  res: Response
) => {
  try {
    const trips = [
      {
        id: "1",
        title: "Europe Tour",
        destination: "Paris",
        createdBy: "John Doe",
        createdAt: "2026-05-10",
        budget: 2500,
      },
      {
        id: "2",
        title: "Japan Adventure",
        destination: "Tokyo",
        createdBy: "Sarah Smith",
        createdAt: "2026-05-11",
        budget: 4200,
      },
    ];

    return res.status(200).json({
      success: true,
      data: trips,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message:
        "Failed to fetch trips",
    });
  }
};

export const deleteTrip = async (
  req: Request,
  res: Response
) => {
  try {
    const { id } = req.params;

    return res.status(200).json({
      success: true,
      message: `Trip ${id} deleted`,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message:
        "Failed to delete trip",
    });
  }
};

export const getAnalyticsData =
  async (
    req: Request,
    res: Response
  ) => {
    try {
      const analytics = {
        totalRevenue: 45200,

        avgTripBudget: 3200,

        monthlyUsers: [
          {
            month: "Jan",
            users: 20,
          },
          {
            month: "Feb",
            users: 35,
          },
          {
            month: "Mar",
            users: 50,
          },
          {
            month: "Apr",
            users: 72,
          },
        ],

        topDestinations: [
          {
            city: "Paris",
            count: 25,
          },
          {
            city: "Tokyo",
            count: 18,
          },
          {
            city: "Dubai",
            count: 15,
          },
        ],

        activityData: [
          {
            name: "Adventure",
            value: 40,
          },
          {
            name: "Luxury",
            value: 25,
          },
          {
            name: "Food",
            value: 20,
          },
          {
            name: "Nature",
            value: 15,
          },
        ],
      };

      return res.status(200).json({
        success: true,
        data: analytics,
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message:
          "Failed to fetch analytics",
      });
    }
  };

export const getAdminProfile =
  async (
    req: Request,
    res: Response
  ) => {
    try {
      return res.status(200).json({
        success: true,
        data: {
          name: "Traveloop Admin",
          email:
            "admin@traveloop.com",
        },
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message:
          "Failed to fetch profile",
      });
    }
  };

export const updateAdminProfile =
  async (
    req: Request,
    res: Response
  ) => {
    try {
      const { name, email } =
        req.body;

      return res.status(200).json({
        success: true,
        message:
          "Profile updated",
        data: {
          name,
          email,
        },
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message:
          "Failed to update profile",
      });
    }
  };
