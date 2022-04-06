import { Controller } from '@nestjs/common';
import { EventPattern, Payload } from '@nestjs/microservices';
import { CoursesService } from '../../http/services/courses.service';
import { EnrollmentsService } from '../../http/services/enrollments.service';
import { StudentsService } from '../../http/services/students.service';

export interface Customer {
  authUserId: string;
}

export interface Product {
  id: string;
  title: string;
  slug: string;
}

export interface PurchaseCreatedPayload {
  customer: Customer;
  product: Product;
}

@Controller()
export class PurchasesController {
  constructor(
    private studentsService: StudentsService,
    private enrollmentsService: EnrollmentsService,
    private coursesService: CoursesService,
  ) {}

  @EventPattern('purchases.new-purchase')
  async purchaseCreated(
    @Payload('value') { customer, product }: PurchaseCreatedPayload,
  ) {
    let student = await this.studentsService.findByStudentByAuthUserId(
      customer.authUserId,
    );

    if (!student) {
      student = await this.studentsService.create({
        authUserId: customer.authUserId,
      });
    }

    let course = await this.coursesService.findCourseBySlug(product.slug);

    if (!course) {
      course = await this.coursesService.createCourse({
        title: product.title,
        slug: product.slug,
      });
    }

    await this.enrollmentsService.create({
      courseId: course.id,
      studentId: student.id,
    });
  }
}
