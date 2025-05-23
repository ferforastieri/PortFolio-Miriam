<script setup>
import { ref, onMounted } from 'vue';
import { FileUpload } from '@/components/common';
import StorageService from '@/api/StorageService.vue';

const screens = ref([]);
const storageService = ref(null);

const handleUploadComplete = async (result) => {
  try {
    screens.value.push({
      id: Date.now(),
      imageUrl: result.url,
      title: 'Nova Tela',
      description: 'Descrição da tela',
      visible: true,
      order: screens.value.length + 1
    });
  } catch (error) {
    console.error('Erro ao processar upload:', error);
  }
};

const toggleVisibility = (screen) => {
  screen.visible = !screen.visible;
};

const deleteScreen = async (screen) => {
  try {
    await storageService.value.deleteFile(screen.imageUrl);
    screens.value = screens.value.filter(s => s.id !== screen.id);
  } catch (error) {
    console.error('Erro ao deletar tela:', error);
  }
};

onMounted(() => {
  // Aqui você pode carregar as telas do banco de dados
});
</script>

<template>
  <div class="screens-management">
    <StorageService ref="storageService" />
    
    <div class="upload-section">
      <h2>Upload de Nova Tela</h2>
      <FileUpload @upload-complete="handleUploadComplete" />
    </div>

    <div class="screens-list">
      <h2>Telas Cadastradas</h2>
      <div v-if="screens.length === 0" class="no-screens">
        Nenhuma tela cadastrada ainda.
      </div>
      <div v-else class="screens-grid">
        <div v-for="screen in screens" :key="screen.id" class="screen-card">
          <img :src="screen.imageUrl" :alt="screen.title" />
          <div class="screen-info">
            <h3>{{ screen.title }}</h3>
            <p>{{ screen.description }}</p>
            <div class="screen-controls">
              <button 
                @click="toggleVisibility(screen)"
                :class="{ 'active': screen.visible }">
                {{ screen.visible ? 'Visível' : 'Oculta' }}
              </button>
              <button class="delete" @click="deleteScreen(screen)">Excluir</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.screens-management {
  padding: 2rem;
  max-width: 1400px;
  margin: 0 auto;
}

.upload-section {
  margin-bottom: 3rem;
  padding-bottom: 2rem;
  border-bottom: 1px solid #e9ecef;
}

.screens-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1.5rem;
  margin-top: 1.5rem;
}

.screen-card {
  border: 1px solid #e9ecef;
  border-radius: 8px;
  overflow: hidden;
  transition: transform 0.2s ease;
}

.screen-card:hover {
  transform: translateY(-2px);
}

.screen-card img {
  width: 100%;
  height: 200px;
  object-fit: cover;
}

.screen-info {
  padding: 1.5rem;
}

.screen-info h3 {
  margin: 0 0 0.5rem 0;
  color: #520;
}

.screen-controls {
  display: flex;
  gap: 1rem;
  margin-top: 1rem;
}

.screen-controls button {
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.2s ease;
}

.screen-controls button.active {
  background-color: #520;
  color: white;
}

.screen-controls button.delete {
  background-color: #dc3545;
  color: white;
}

.no-screens {
  text-align: center;
  padding: 2rem;
  background: #f8f9fa;
  border-radius: 8px;
  color: #6c757d;
}
</style> 