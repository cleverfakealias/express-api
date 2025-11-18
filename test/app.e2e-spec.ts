import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';

describe('AppController (e2e)', () => {
    let app: INestApplication;

    beforeEach(async () => {
        const moduleFixture: TestingModule = await Test.createTestingModule({
            imports: [AppModule],
        }).compile();

        app = moduleFixture.createNestApplication();
        await app.init();
    });

    afterEach(async () => {
        await app.close();
    });

    describe('/up (GET)', () => {
        it('should return health check status', () => {
            return request(app.getHttpServer())
                .get('/up')
                .expect(200)
                .expect(res => {
                    expect(res.body).toHaveProperty('status');
                    expect(res.body).toHaveProperty('info');
                    expect(res.body).toHaveProperty('details');
                });
        });
    });

    describe('/data (GET)', () => {
        it('should return paginated data without filters', () => {
            return request(app.getHttpServer())
                .get('/data')
                .expect(200)
                .expect(res => {
                    expect(res.body).toHaveProperty('data');
                    expect(res.body).toHaveProperty('pagination');
                    expect(Array.isArray(res.body.data)).toBe(true);
                });
        });

        it('should filter data by category', () => {
            return request(app.getHttpServer())
                .get('/data?category=technology')
                .expect(200)
                .expect(res => {
                    expect(res.body.data.every((item: any) => item.category === 'technology')).toBe(true);
                });
        });

        it('should filter data by status', () => {
            return request(app.getHttpServer())
                .get('/data?status=active')
                .expect(200)
                .expect(res => {
                    expect(res.body.data.every((item: any) => item.status === 'active')).toBe(true);
                });
        });

        it('should search data', () => {
            return request(app.getHttpServer())
                .get('/data?search=node')
                .expect(200)
                .expect(res => {
                    expect(res.body.data.length).toBeGreaterThan(0);
                });
        });

        it('should paginate data', () => {
            return request(app.getHttpServer())
                .get('/data?page=1&limit=2')
                .expect(200)
                .expect(res => {
                    expect(res.body.data.length).toBeLessThanOrEqual(2);
                    expect(res.body.pagination.page).toBe(1);
                    expect(res.body.pagination.limit).toBe(2);
                });
        });
    });
});