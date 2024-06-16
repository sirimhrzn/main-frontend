<?php
// Check if form is submitted
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Retrieve form data
    $enabled = isset($_POST['enabled']) ? $_POST['enabled'] : '0';
    $category_id = $_POST['category_id'];
    // Process uploaded image file
    $image = $_FILES['image'];
    $size = $_POST['size'];
    $quantity = $_POST['quantity'];
    $description = $_POST['description'];
    $price = $_POST['price'];

    // Example of handling image upload (adjust as per your requirements)
    $target_dir = "uploads/";
    $target_file = $target_dir . basename($image['name']);
    $uploadOk = 1;
    $imageFileType = strtolower(pathinfo($target_file, PATHINFO_EXTENSION));

    // Check file size
    if ($image['size'] > 500000) {
        echo "Sorry, your file is too large.";
        $uploadOk = 0;
    }

    // Allow certain file formats
    if ($imageFileType != "jpg" && $imageFileType != "png" && $imageFileType != "jpeg"
        && $imageFileType != "gif" && $imageFileType != "svg") {
        echo "Sorry, only JPG, JPEG, PNG, GIF, and SVG files are allowed.";
        $uploadOk = 0;
    }

    // If uploadOk is set to 0 by an error
    if ($uploadOk == 0) {
        echo "Sorry, your file was not uploaded.";
    // If everything is ok, try to upload file
    } else {
        if (move_uploaded_file($image['tmp_name'], $target_file)) {
            echo "The file ". htmlspecialchars( basename( $image['name'])). " has been uploaded.";
        } else {
            echo "Sorry, there was an error uploading your file.";
        }
    }

    // Display form data (for demonstration)
    echo "<h2>Form Data:</h2>";
    echo "<p>Enabled: " . ($enabled == '1' ? 'Yes' : 'No') . "</p>";
    echo "<p>Category ID: " . $category_id . "</p>";
    echo "<p>Size: " . $size . "</p>";
    echo "<p>Quantity: " . $quantity . "</p>";
    echo "<p>Description: " . $description . "</p>";
    echo "<p>Price: $" . $price . "</p>";
}
?>
