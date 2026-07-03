<?php
// ==========================================
// CONFIGURATION & CORS HEADERS
// ==========================================
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
header("Content-Type: application/json");

// Tangani Preflight Request (OPTIONS) otomatis dari browser agar tidak error CORS
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

$host = "localhost";
$db_name = "u212616308_SOBATUMKMPRO";
$username = "u212616308_SOBATUMKMPRO";
$password = "5M/tahun"; 

try {
    $conn = new PDO("mysql:host=$host;dbname=$db_name", $username, $password);
    // Mengaktifkan mode error exception agar jika ada query salah langsung ketahuan penyebabnya
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    // Mengatur default fetch ke associative array
    $conn->setAttribute(PDO::ATTR_DEFAULT_FETCH_MODE, PDO::FETCH_ASSOC);
} catch(PDOException $e) {
    echo json_encode(["success" => false, "message" => "Koneksi Database Gagal: " . $e->getMessage()]);
    exit;
}

// Menangkap parameter aksi dari URL, misal: ?action=get_programs
$action = $_GET['action'] ?? '';

// ==========================================
// 1. METHOD GET (READ DATA)
// ==========================================
if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    if ($action === 'get_programs') {
        try {
            $stmt = $conn->query("SELECT * FROM programs ORDER BY id DESC");
            echo json_encode($stmt->fetchAll());
        } catch (PDOException $e) {
            echo json_encode(["success" => false, "message" => "Gagal mengambil program: " . $e->getMessage()]);
        }
    } elseif ($action === 'get_articles') {
        try {
            $stmt = $conn->query("SELECT * FROM articles ORDER BY id DESC");
            echo json_encode($stmt->fetchAll());
        } catch (PDOException $e) {
            echo json_encode(["success" => false, "message" => "Gagal mengambil artikel: " . $e->getMessage()]);
        }
    } else {
        echo json_encode(["success" => false, "message" => "Action GET tidak dikenali"]);
    }
}

// ==========================================
// 2. METHOD POST (CREATE & UPDATE DATA)
// ==========================================
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Membaca input JSON mentah (raw payload) yang dikirim frontend
    $input = file_get_contents("php://input");
    $data = json_decode($input, true);
    
    // Validasi jika JSON kosong atau salah format
    if (!$data) {
        echo json_encode(["success" => false, "message" => "Format payload harus JSON dan tidak boleh kosong"]);
        exit;
    }
    
    try {
        // --- FITUR SAVE PROGRAM ---
        if ($action === 'save_program') {
            if (isset($data['id']) && $data['id'] != '') {
                // Jalankan proses UPDATE jika id dikirim
                $stmt = $conn->prepare("UPDATE programs SET title=?, date=?, link=?, type=?, poster=? WHERE id=?");
                $stmt->execute([
                    $data['title'] ?? '', 
                    $data['date'] ?? '', 
                    $data['link'] ?? '', 
                    $data['type'] ?? '', 
                    $data['poster'] ?? '', 
                    $data['id']
                ]);
                echo json_encode(["success" => true, "message" => "Program berhasil diperbarui"]);
            } else {
                // Jalankan proses INSERT baru jika tidak ada id
                $stmt = $conn->prepare("INSERT INTO programs (title, date, link, type, poster) VALUES (?, ?, ?, ?, ?)");
                $stmt->execute([
                    $data['title'] ?? '', 
                    $data['date'] ?? '', 
                    $data['link'] ?? '', 
                    $data['type'] ?? '', 
                    $data['poster'] ?? ''
                ]);
                echo json_encode(["success" => true, "id" => $conn->lastInsertId(), "message" => "Program berhasil ditambah"]);
            }
            
        // --- FITUR SAVE ARTIKEL ---
        } elseif ($action === 'save_article') {
            if (isset($data['id']) && $data['id'] != '') {
                // Jalankan proses UPDATE jika id dikirim
                $stmt = $conn->prepare("UPDATE articles SET title=?, date=?, content=?, poster=? WHERE id=?");
                $stmt->execute([
                    $data['title'] ?? '', 
                    $data['date'] ?? '', 
                    $data['content'] ?? '', 
                    $data['poster'] ?? '', 
                    $data['id']
                ]);
                echo json_encode(["success" => true, "message" => "Artikel berhasil diperbarui"]);
            } else {
                // Jalankan proses INSERT baru jika tidak ada id
                $stmt = $conn->prepare("INSERT INTO articles (title, date, content, poster) VALUES (?, ?, ?, ?)");
                $stmt->execute([
                    $data['title'] ?? '', 
                    $data['date'] ?? '', 
                    $data['content'] ?? '', 
                    $data['poster'] ?? ''
                ]);
                echo json_encode(["success" => true, "id" => $conn->lastInsertId(), "message" => "Artikel berhasil ditambah"]);
            }
        } else {
            echo json_encode(["success" => false, "message" => "Action POST tidak dikenali"]);
        }
    } catch (PDOException $e) {
        echo json_encode(["success" => false, "message" => "Database Error: " . $e->getMessage()]);
    }
}

// ==========================================
// 3. METHOD DELETE (DELETE DATA)
// ==========================================
if ($_SERVER['REQUEST_METHOD'] === 'DELETE') {
    // Menangkap ID dari parameter URL, contoh: ?action=delete_program&id=5
    $id = $_GET['id'] ?? null;
    if (!$id) {
        echo json_encode(["success" => false, "message" => "ID tidak ditemukan pada parameter URL"]);
        exit;
    }

    try {
        if ($action === 'delete_program') {
            $stmt = $conn->prepare("DELETE FROM programs WHERE id = ?");
            $stmt->execute([$id]);
            
            if ($stmt->rowCount() > 0) {
                echo json_encode(["success" => true, "message" => "Program berhasil dihapus"]);
            } else {
                echo json_encode(["success" => false, "message" => "Data program tidak ditemukan atau sudah dihapus"]);
            }
        } elseif ($action === 'delete_article') {
            $stmt = $conn->prepare("DELETE FROM articles WHERE id = ?");
            $stmt->execute([$id]);
            
            if ($stmt->rowCount() > 0) {
                echo json_encode(["success" => true, "message" => "Artikel berhasil dihapus"]);
            } else {
                echo json_encode(["success" => false, "message" => "Data artikel tidak ditemukan atau sudah dihapus"]);
            }
        } else {
            echo json_encode(["success" => false, "message" => "Action DELETE tidak dikenali"]);
        }
    } catch (PDOException $e) {
        echo json_encode(["success" => false, "message" => "Delete Error: " . $e->getMessage()]);
    }
}
?>