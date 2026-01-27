import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import mysql from 'mysql2/promise';

export async function POST(request) {
  let connection;
  
  try {
    const { currentPassword, newPassword } = await request.json();

    // TODO: Get the current user from your authentication/session
    // Replace 'admin' with the actual logged-in username
    const username = 'admin'; // CHANGE THIS to get from your auth system

    // Validate input
    if (!currentPassword || !newPassword) {
      return NextResponse.json(
        { error: 'Current and new password are required' },
        { status: 400 }
      );
    }

    if (newPassword.length < 8) {
      return NextResponse.json(
        { error: 'New password must be at least 8 characters' },
        { status: 400 }
      );
    }

    // Create database connection
    connection = await mysql.createConnection(process.env.DATABASE_URL);

    // Query user from database
    const [rows] = await connection.execute(
      'SELECT * FROM users WHERE username = ?',
      [username]
    );
    
    const user = rows[0];
    
    if (!user) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      );
    }

    // Verify current password
    const isValidPassword = await bcrypt.compare(currentPassword, user.password);
    
    if (!isValidPassword) {
      return NextResponse.json(
        { error: 'Current password is incorrect' },
        { status: 401 }
      );
    }

    // Hash new password
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // Update password in database
    await connection.execute(
      'UPDATE users SET password = ? WHERE username = ?',
      [hashedPassword, username]
    );

    return NextResponse.json(
      { message: 'Password changed successfully' },
      { status: 200 }
    );

  } catch (error) {
    console.error('Password change error:', error);
    return NextResponse.json(
      { error: 'Internal server error: ' + error.message },
      { status: 500 }
    );
  } finally {
    // Close database connection
    if (connection) {
      await connection.end();
    }
  }
}
