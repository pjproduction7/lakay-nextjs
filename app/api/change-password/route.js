import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import Database from 'better-sqlite3';
import path from 'path';

// Initialize database connection
// ADJUST THIS PATH to match where your database file is located!
const dbPath = path.join(process.cwd(), 'database.db'); // Change 'database.db' to your actual filename
const db = new Database(dbPath);

export async function POST(request) {
  try {
    const { currentPassword, newPassword } = await request.json();

    // TODO: Get the current user from your authentication/session
    // Replace 'admin' with the actual logged-in username
    // Examples:
    // - const session = await getServerSession(authOptions);
    // - const username = session.user.username;
    // - OR if you have user ID in cookies/headers
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

    // Query user from database
    // ADJUST the table and column names to match your database schema!
    const user = db.prepare('SELECT * FROM users WHERE username = ?').get(username);
    
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
    // ADJUST the table and column names to match your database schema!
    db.prepare('UPDATE users SET password = ? WHERE username = ?').run(hashedPassword, username);

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
  }
}
