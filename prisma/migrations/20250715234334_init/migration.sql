-- AlterTable
ALTER TABLE "Admin" ADD COLUMN     "role" TEXT NOT NULL DEFAULT 'admin';

-- AlterTable
ALTER TABLE "Student" ADD COLUMN     "role" TEXT NOT NULL DEFAULT 'student';

-- AlterTable
ALTER TABLE "Teacher" ADD COLUMN     "role" TEXT NOT NULL DEFAULT 'teacher';
