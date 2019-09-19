<template>
  <div id="app">
    <header>
      <nav>
        <div class="nav-wrapper">
          <a href="#" class="brand-logo">Table info</a>
        </div>
      </nav>
    </header>
    <main>
      <div class="container">
        <MainPage/>
      </div>
    </main>
    <footer class="page-footer">
      <div class="footer-copyright">
        <div class="container">© 2019</div>
      </div>
    </footer>
  </div>
</template>

<script>
import MainPage from './components/MainPage';

export default {
  name: 'app',
  components: {
    MainPage,
  },
}
</script>

<style lang="scss">
@import '~materialize-css/dist/css/materialize.min.css';
@import 'assets/index.css';
</style>
