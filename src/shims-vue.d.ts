declare module '*.vue' {
  import Vue from 'vue'
  export default Vue
}

declare module '@/components/*' {
  import Vue from 'vue'
  // noinspection JSDuplicatedDeclaration
  export default Vue
}
