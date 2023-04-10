npm run clean
export NODE_ENV=production
node rollup.mjs
tsc -p tsconfig.build.json
echo -e "\033[42;37m 构建成功！请检查生成的 cjs es types\033[0m"