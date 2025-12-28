import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const assignmentSchema = new mongoose.Schema({
  title: String,
  question: String,
  difficulty: String,
  sampleTables: [{
    tableName: String,
    columns: [{
      columnName: String,
      dataType: String
    }]
  }]
});

const Assignment = mongoose.model('Assignment', assignmentSchema);

const sampleAssignments = [
  {
    title: "Get All Users",
    question: "Write a SQL query to select all users from the users table.",
    difficulty: "easy",
    sampleTables: [
      {
        tableName: "users",
        columns: [
          { columnName: "id", dataType: "INT" },
          { columnName: "name", dataType: "VARCHAR(100)" },
          { columnName: "email", dataType: "VARCHAR(100)" },
          { columnName: "created_at", dataType: "TIMESTAMP" }
        ]
      }
    ]
  },
  {
    title: "Count Users by Department",
    question: "Write a query to count the number of employees in each department.",
    difficulty: "medium",
    sampleTables: [
      {
        tableName: "employees",
        columns: [
          { columnName: "id", dataType: "INT" },
          { columnName: "name", dataType: "VARCHAR(100)" },
          { columnName: "department", dataType: "VARCHAR(50)" },
          { columnName: "salary", dataType: "DECIMAL(10,2)" }
        ]
      }
    ]
  },
  {
    title: "Find Top Earners",
    question: "Write a query to find employees earning more than $50,000 ordered by salary descending.",
    difficulty: "medium",
    sampleTables: [
      {
        tableName: "employees",
        columns: [
          { columnName: "id", dataType: "INT" },
          { columnName: "name", dataType: "VARCHAR(100)" },
          { columnName: "salary", dataType: "DECIMAL(10,2)" }
        ]
      }
    ]
  },
  {
    title: "Complex Join Query",
    question: "Write a query to get customer names with their total orders count.",
    difficulty: "hard",
    sampleTables: [
      {
        tableName: "customers",
        columns: [
          { columnName: "id", dataType: "INT" },
          { columnName: "name", dataType: "VARCHAR(100)" },
          { columnName: "email", dataType: "VARCHAR(100)" }
        ]
      },
      {
        tableName: "orders",
        columns: [
          { columnName: "id", dataType: "INT" },
          { columnName: "customer_id", dataType: "INT" },
          { columnName: "amount", dataType: "DECIMAL(10,2)" },
          { columnName: "created_at", dataType: "TIMESTAMP" }
        ]
      }
    ]
  },
  {
    title: "Window Functions",
    question: "Write a query to rank employees by salary within each department.",
    difficulty: "hard",
    sampleTables: [
      {
        tableName: "employees",
        columns: [
          { columnName: "id", dataType: "INT" },
          { columnName: "name", dataType: "VARCHAR(100)" },
          { columnName: "department", dataType: "VARCHAR(50)" },
          { columnName: "salary", dataType: "DECIMAL(10,2)" }
        ]
      }
    ]
  }
];

async function seedDatabase() {
  try {
    const mongoUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/sql-assignments';
    console.log('Connecting to MongoDB:', mongoUri);
    
    await mongoose.connect(mongoUri);
    console.log('Connected to MongoDB');

    // Clear existing assignments
    await Assignment.deleteMany({});
    console.log('Cleared existing assignments');

    // Insert sample assignments
    const result = await Assignment.insertMany(sampleAssignments);
    console.log(`✅ Added ${result.length} assignments to database`);
    
    result.forEach(assignment => {
      console.log(`  - ${assignment.title} (${assignment.difficulty})`);
    });

    await mongoose.connection.close();
    console.log('Database connection closed');
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    process.exit(1);
  }
}

seedDatabase();