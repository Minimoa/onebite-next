# onebite-next


## front
.env
```
NEXT_PUBLIC_API_SERVER_URL="http://localhost:12345"
```

## back
1. env 파일 생성
```
# Connect to Supabase via connection pooling with Supavisor.
DATABASE_URL="postgresql://postgres.pkxswycyztiagpxgsbmi:[YOUR-PASSWORD]@aws-0-ap-northeast-2.pooler.supabase.com:6543/postgres?pgbouncer=true"

# Direct connection to the database. Used for migrations.
DIRECT_URL="postgresql://postgres.pkxswycyztiagpxgsbmi:[YOUR-PASSWORD]@aws-0-ap-northeast-2.pooler.supabase.com:5432/postgres"
        
```
2. 의존성 설치
```
pnpm i
```
3. 서버 가동
```
pnpm run start
```
