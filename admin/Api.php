<?php
include('config.php');    
header('Access-Control-Allow-Origin: *');
    // header('Access-Control-Allow-Origin: *');
    header('Access-Control-Allow-Methods: GET, POST, PATCH, PUT, DELETE, OPTIONS');
    // header('Access-Control-Allow-Headers: Origin, Content-Type, X-Auth-Token');
    header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
// echo "<pre>"; print_r($request->input()); die;
// ini_set('display_errors', 1);
// ini_set('display_startup_errors', 1);
// error_reporting(E_ALL);

if($_POST['action'] == 'submit-app-data')
{
    $id = $_POST['id'];
    $a1_name = $_POST['a1_name'];
    $a1_fName = $_POST['a1_fName'];
    $a1_activity = $_POST['a1_activity'];
    $a1_paddress = $_POST['a1_paddress'];
    $a1_age = $_POST['a1_age'];
    $a1_nrc = $_POST['a1_nrc'];
    $a1_phone = $_POST['a1_phone'];
    $a1_passport = $_POST['a1_passport'];
    $a1_photo = $_POST['a1_photo'];

    $a2_name = $_POST['a2_name'];
    $a2_fName = $_POST['a2_fName'];
    $a2_activity = $_POST['a2_activity'];
    $a2_paddress = $_POST['a2_paddress'];
    $a2_age = $_POST['a2_age'];
    $a2_nrc = $_POST['a2_nrc'];
    $a2_phone = $_POST['a2_phone'];
    $a2_passport = $_POST['a2_passport'];
    $a2_photo = $_POST['a2_photo'];
    $app_date = $_POST['app_date'];
    $application_no = $_POST['application_no'];
    $applicant_type = $_POST['applicant_type'];
    $status = $_POST['status'];
    $submittedBy = $_POST['submittedBy'];
    $userId = $_POST['userId'];
    $loan_type = $_POST['loan_type'];

    // echo "<pre>"; print_r($_POST); die;
    // echo "<pre>"; print_r(basename($_FILES["a1_photo"]["type"])); die;
//     ini_set('display_errors', 1);
// ini_set('display_startup_errors', 1);
// error_reporting(E_ALL);

    // $target_file_one = ''

    if($_FILES["a1_photo"] != ''){

        $target_dir = "uploads/";
        // $target_file_one = time().basename($_FILES["a1_photo"]["name"]);
        $target_file_one = time().'.'.basename($_FILES["a1_photo"]["type"]);


        move_uploaded_file($_FILES["a1_photo"]["tmp_name"], $target_dir .$target_file_one);
    }

    // $target_file_two = ''

    if($_FILES && $_FILES["a2_photo"] != ''){        
        $target_dir = "uploads/";
        $target_file_two = time().'.'.basename($_FILES["a2_photo"]["type"]);
        move_uploaded_file($_FILES["a2_photo"]["tmp_name"], $target_dir .$target_file_two);   
    }

    // echo "<pre>"; print_r($target_file_one); die;

    if($id == 0 || $id ==  null){
        $querry = "INSERT INTO app_data(a1_name, a1_fName, a1_activity , a1_paddress, a1_age, a1_nrc, a1_phone, a1_passport, a1_photo, a2_name, a2_fName, a2_activity, a2_paddress, a2_age, a2_nrc, a2_phone, a2_passport, a2_photo, app_date, application_no, applicant_type, status, submittedBy, userId,loan_type) VALUES('$a1_name', '$a1_fName', '$a1_activity','$a1_paddress' ,  '$a1_age', '$a1_nrc', '$a1_phone', '$a1_passport', '$target_file_one', '$a2_name', '$a2_fName', '$a2_activity', '$a2_paddress', '$a2_age', '$a2_nrc', '$a2_phone', '$a2_passport', '$target_file_two', '$app_date', '$application_no', '$applicant_type', '$status', '$submittedBy','$userId','$loan_type')";
    }else{
        if($_FILES["a1_photo"] != ''){
            $querry = "UPDATE app_data SET a1_name='$a1_name',a1_fName='$a1_fName',a1_activity='$a1_activity',a1_paddress='$a1_paddress',a1_age='$a1_age',a1_nrc='$a1_nrc',a1_phone='$a1_phone',a1_passport='$a1_passport',a1_photo='$target_file_one',a2_name='$a2_name',a2_fName='$a2_fName',a2_activity='$a2_activity',a2_paddress='$a2_paddress',a2_age='$a2_age',a2_nrc='$a2_nrc',a2_phone='$a2_phone',a2_passport='$a2_passport',app_date='$app_date',applicant_type='$applicant_type',status='$status', submittedBy='$submittedBy', userId='$userId', loan_type='$loan_type' WHERE id=".$id;
        }
        if($_FILES["a2_photo"] != ''){
           $querry = "UPDATE app_data SET a1_name='$a1_name',a1_fName='$a1_fName',a1_activity='$a1_activity',a1_paddress='$a1_paddress',a1_age='$a1_age',a1_nrc='$a1_nrc',a1_phone='$a1_phone',a1_passport='$a1_passport',a2_name='$a2_name',a2_fName='$a2_fName',a2_activity='$a2_activity',a2_paddress='$a2_paddress',a2_age='$a2_age',a2_nrc='$a2_nrc',a2_phone='$a2_phone',a2_passport='$a2_passport',a2_photo='$target_file_two',app_date='$app_date',applicant_type='$applicant_type',status='$status',submittedBy='$submittedBy', userId='$userId', loan_type='$loan_type' WHERE id=".$id;
        }

        if($_FILES["a1_photo"] == '' && $_FILES["a2_photo"] == ''){
           $querry = "UPDATE app_data SET a1_name='$a1_name',a1_fName='$a1_fName',a1_activity='$a1_activity',a1_paddress='$a1_paddress',a1_age='$a1_age',a1_nrc='$a1_nrc',a1_phone='$a1_phone',a1_passport='$a1_passport',a2_name='$a2_name',a2_fName='$a2_fName',a2_activity='$a2_activity',a2_paddress='$a2_paddress',a2_age='$a2_age',a2_nrc='$a2_nrc',a2_phone='$a2_phone',a2_passport='$a2_passport',app_date='$app_date',applicant_type='$applicant_type',status='$status',submittedBy='$submittedBy', userId='$userId', loan_type='$loan_type' WHERE id=".$id;
        }

        if($_FILES["a1_photo"] != '' && $_FILES["a2_photo"] != ''){
           $querry = "UPDATE app_data SET a1_name='$a1_name',a1_fName='$a1_fName',a1_activity='$a1_activity',a1_paddress='$a1_paddress',a1_age='$a1_age',a1_nrc='$a1_nrc',a1_phone='$a1_phone',a1_passport='$a1_passport',a2_name='$a2_name',a2_fName='$a2_fName',a2_activity='$a2_activity',a2_paddress='$a2_paddress',a2_age='$a2_age',a2_nrc='$a2_nrc',a2_phone='$a2_phone',a2_passport='$a2_passport',app_date='$app_date' ,a1_photo='$target_file_one',a2_photo='$target_file_two',applicant_type='$applicant_type',status='$status',submittedBy='$submittedBy', userId='$userId', loan_type='$loan_type' WHERE id=".$id;
        }
    }

    $result = mysqli_query($conn,$querry); 

        // Get last insert id 
        $lastInsertID = mysqli_insert_id($conn); 

        // echo "Last insert ID : ".$lastInsertID; 

    echo $lastInsertID;
}

if($_POST['action'] == 'getAppDataList'){

    $userId = $_POST['userId'];
    $loan_type = $_POST['loan_type'];
    ini_set('display_errors', 1);
    ini_set('display_startup_errors', 1);
    error_reporting(E_ALL);
    // echo "<pre>"; print_r($loan_type); die;
    // "SELECT * FROM media WHERE ref_id = '$ref_id' AND type = '1'"
    if($userId == "0"){
        $query = "SELECT * FROM app_data where loan_type= '$loan_type'";
    }else{
        $query = "SELECT * FROM app_data where userId='$userId'AND loan_type ='$loan_type'";
    }

    $response = [];
    $res_header = mysqli_query($conn, $query);
    while ($row_header = mysqli_fetch_assoc($res_header)) {
        $response[] = $row_header;
    
    }
    echo json_encode($response);
}

if($_POST['action'] == 'getSingleData'){
    $res_header = mysqli_query($conn, "SELECT * FROM app_data Where id=".$_POST['id']);
    while ($row_header = mysqli_fetch_assoc($res_header)) {
        $response[] = $row_header;
    
    }
    echo json_encode($response);
}

if($_POST['action'] == 'submit-guar-data')
{
    $ref_id = $_POST['ref_id'];
    // $ref_id = 1;
    $a1_name = $_POST['a1_name'];
    $a1_fName = $_POST['a1_fName'];
    $a1_activity = $_POST['a1_activity'];
    $a1_paddress = $_POST['a1_paddress'];
    $a1_age = $_POST['a1_age'];
    $a1_nrc = $_POST['a1_nrc'];
    $a1_phone = $_POST['a1_phone'];
    $a1_passport = $_POST['a1_passport'];
    $a1_photo = $_POST['a1_photo'];

    $a2_name = $_POST['a2_name'];
    $a2_fName = $_POST['a2_fName'];
    $a2_activity = $_POST['a2_activity'];
    $a2_paddress = $_POST['a2_paddress'];
    $a2_age = $_POST['a2_age'];
    $a2_nrc = $_POST['a2_nrc'];
    $a2_phone = $_POST['a2_phone'];
    $a2_passport = $_POST['a2_passport'];
    $a2_photo = $_POST['a2_photo'];

    $a3_name = $_POST['a3_name'];
    $a3_fName = $_POST['a3_fName'];
    $a3_activity = $_POST['a3_activity'];
    $a3_paddress = $_POST['a3_paddress'];
    $a3_age = $_POST['a3_age'];
    $a3_nrc = $_POST['a3_nrc'];
    $a3_phone = $_POST['a3_phone'];
    $a3_passport = $_POST['a3_passport'];
    $a3_photo = $_POST['a3_photo'];

    $app_date = $_POST['app_date'];
    $status = $_POST['status'];
    // echo "<pre>"; print_r($_POST); die;
    // echo "<pre>"; print_r($_FILES); die;
//     ini_set('display_errors', 1);
// ini_set('display_startup_errors', 1);
// error_reporting(E_ALL);

     if($_FILES["a1_photo"] != ''){
        $target_dir = "uploads/";
        // $target_file_one = time().basename($_FILES["a1_photo"]["name"]);
        $target_file_one = time().'.'.basename($_FILES["a1_photo"]["type"]);
        move_uploaded_file($_FILES["a1_photo"]["tmp_name"], $target_dir .$target_file_one);
    }

    if($_FILES["a2_photo"] != ''){        
        $target_dir = "uploads/";
        // $target_file_two = time().basename($_FILES["a2_photo"]["name"]);
        $target_file_two = time().'.'.basename($_FILES["a2_photo"]["type"]);
        move_uploaded_file($_FILES["a2_photo"]["tmp_name"], $target_dir .$target_file_two);   
    }

    if($_FILES["a3_photo"] != ''){        
        $target_dir = "uploads/";
        // $target_file_two = time().basename($_FILES["a2_photo"]["name"]);
        $target_file_three = time().'.'.basename($_FILES["a3_photo"]["type"]);
        move_uploaded_file($_FILES["a3_photo"]["tmp_name"], $target_dir .$target_file_three);   
    }

    $res_header = mysqli_query($conn, "SELECT * FROM guar_data Where ref_id=".$ref_id);

    
    // echo "<pre>"; print_r($res_header->num_rows); die;
    if($res_header->num_rows == 0){
        $querry = "INSERT INTO guar_data(ref_id,a1_name, a1_fName, a1_activity,a1_paddress, a1_age, a1_nrc, a1_phone, a1_passport, a1_photo, a2_name, a2_fName, a2_activity, a2_paddress, a2_age, a2_nrc, a2_phone, a2_passport, a2_photo,a3_name, a3_fName, a3_activity, a3_paddress, a3_age, a3_nrc, a3_phone, a3_passport, a3_photo, app_date) VALUES('$ref_id','$a1_name', '$a1_fName', '$a1_activity','$a1_paddress', '$a1_age', '$a1_nrc', '$a1_phone', '$a1_passport', '$target_file_one', '$a2_name', '$a2_fName', '$a2_activity', '$a2_paddress', '$a2_age', '$a2_nrc', '$a2_phone', '$a2_passport', '$target_file_two','$a3_name', '$a3_fName', '$a3_activity', '$a3_paddress', '$a3_age', '$a3_nrc', '$a3_phone', '$a3_passport', '$target_file_three', '$app_date')";
    }else{

        if($_FILES["a1_photo"] != ''){
            $querry = "UPDATE guar_data SET ref_id='$ref_id',a1_name='$a1_name',a1_fName='$a1_fName',a1_activity='$a1_activity',a1_paddress='$a1_paddress',a1_age='$a1_age',a1_nrc='$a1_nrc',a1_phone='$a1_phone',a1_passport='$a1_passport',a1_photo='$target_file_one',a2_name='$a2_name',a2_fName='$a2_fName',a2_activity='$a2_activity',a2_paddress='$a2_paddress',a2_age='$a2_age',a2_nrc='$a2_nrc',a2_phone='$a2_phone',a2_passport='$a2_passport',a3_name='$a3_name',a3_fName='$a3_fName',a3_activity='$a3_activity',a3_paddress='$a3_paddress',a3_age='$a3_age',a3_nrc='$a3_nrc',a3_phone='$a3_phone',a3_passport='$a3_passport' WHERE ref_id=".$ref_id;
        }
        if($_FILES["a2_photo"] != ''){
            $querry = "UPDATE guar_data SET ref_id='$ref_id',a1_name='$a1_name',a1_fName='$a1_fName',a1_activity='$a1_activity',a1_paddress='$a1_paddress',a1_age='$a1_age',a1_nrc='$a1_nrc',a1_phone='$a1_phone',a1_passport='$a1_passport',a2_name='$a2_name',a2_fName='$a2_fName',a2_activity='$a2_activity',a2_paddress='$a2_paddress',a2_age='$a2_age',a2_nrc='$a2_nrc',a2_phone='$a2_phone',a2_passport='$a2_passport',a2_photo='$target_file_two',a3_name='$a3_name',a3_fName='$a3_fName',a3_activity='$a3_activity',a3_paddress='$a3_paddress',a3_age='$a3_age',a3_nrc='$a3_nrc',a3_phone='$a3_phone',a3_passport='$a3_passport' WHERE ref_id=".$ref_id;
        }

        if($_FILES["a3_photo"] != ''){
            $querry = "UPDATE guar_data SET ref_id='$ref_id',a1_name='$a1_name',a1_fName='$a1_fName',a1_activity='$a1_activity',a1_paddress='$a1_paddress',a1_age='$a1_age',a1_nrc='$a1_nrc',a1_phone='$a1_phone',a1_passport='$a1_passport',a2_name='$a2_name',a2_fName='$a2_fName',a2_activity='$a2_activity',a2_paddress='$a2_paddress',a2_age='$a2_age',a2_nrc='$a2_nrc',a2_phone='$a2_phone',a2_passport='$a2_passport',a3_name='$a3_name',a3_fName='$a3_fName',a3_activity='$a3_activity',a3_paddress='$a3_paddress',a3_age='$a3_age',a3_nrc='$a3_nrc',a3_phone='$a3_phone',a3_passport='$a3_passport',a3_photo='$target_file_three' WHERE ref_id=".$ref_id;
        }

        if($_FILES["a1_photo"] == '' && $_FILES["a2_photo"] == '' && $_FILES["a3_photo"] == ''){
            $querry = "UPDATE guar_data SET ref_id='$ref_id',a1_name='$a1_name',a1_fName='$a1_fName',a1_activity='$a1_activity',a1_paddress='$a1_paddress',a1_age='$a1_age',a1_nrc='$a1_nrc',a1_phone='$a1_phone',a1_passport='$a1_passport',a2_name='$a2_name',a2_fName='$a2_fName',a2_activity='$a2_activity',a2_paddress='$a2_paddress',a2_age='$a2_age',a2_nrc='$a2_nrc',a2_phone='$a2_phone',a2_passport='$a2_passport',a3_name='$a3_name',a3_fName='$a3_fName',a3_activity='$a3_activity',a3_paddress='$a3_paddress',a3_age='$a3_age',a3_nrc='$a3_nrc',a3_phone='$a3_phone',a3_passport='$a3_passport' WHERE ref_id=".$ref_id;
        }

        if($_FILES["a1_photo"] != '' && $_FILES["a2_photo"] != '' && $_FILES["a3_photo"] != ''){
            $querry = "UPDATE guar_data SET ref_id='$ref_id',a1_name='$a1_name',a1_fName='$a1_fName',a1_activity='$a1_activity',a1_paddress='$a1_paddress',a1_age='$a1_age',a1_nrc='$a1_nrc',a1_phone='$a1_phone',a1_passport='$a1_passport',a2_name='$a2_name',a2_fName='$a2_fName',a2_activity='$a2_activity',a2_paddress='$a2_paddress',a2_age='$a2_age',a2_nrc='$a2_nrc',a2_phone='$a2_phone',a2_passport='$a2_passport',a1_photo='$target_file_one',a2_photo='$target_file_two',a3_photo='$target_file_three' WHERE ref_id=".$ref_id;
        }
    }

    $result = mysqli_query($conn,$querry); 

    $querry1 = "UPDATE app_data SET status='$status' WHERE id=".$ref_id;
    $result1 = mysqli_query($conn,$querry1); 
    echo $result;
}

if($_POST['action'] == 'getSingleDataGuar'){
    $res_header = mysqli_query($conn, "SELECT * FROM guar_data Where ref_id=".$_POST['id']);
    while ($row_header = mysqli_fetch_assoc($res_header)) {
        $response[] = $row_header;
    
    }
    echo json_encode($response);
}

if($_POST['action'] == 'submit-loan-request'){

    $ref_id =  $_POST['ref_id'];
    $dataJson =  $_POST['dataJson'];
    $total =  $_POST['total'];
    $appMargin =  $_POST['appMargin'];
    $appMarginD =  $_POST['appMarginD'];
    $marginAge =  $_POST['marginAge'];
    $loanRequest =  $_POST['loanRequest'];
    $loanRequestD =  $_POST['loanRequestD'];
    $propertyD =  $_POST['propertyD'];
    $comment =  $_POST['comment'];
    $status = $_POST['status'];
    // echo "<pre>"; print_r($_POST); die;
    // echo "<pre>"; print_r($_FILES); die;
    ini_set('display_errors', 1);
    ini_set('display_startup_errors', 1);
    error_reporting(E_ALL);
    $res_header = mysqli_query($conn, "SELECT * FROM loan_request Where ref_id=".$ref_id);

     if($res_header->num_rows == 0){
        $querry = "INSERT INTO loan_request(ref_id, dataJson, total, appMargin, appMarginD, marginAge, loanRequest, loanRequestD, propertyD, comment) VALUES ('$ref_id', '$dataJson', '$total', '$appMargin', '$appMarginD', '$marginAge', '$loanRequest', '$loanRequestD', '$propertyD', '$comment')";
     }else{
        $querry = "UPDATE loan_request SET dataJson='$dataJson',total='$total',appMargin='$appMargin',appMarginD='$appMarginD',marginAge='$marginAge',loanRequest='$loanRequest',loanRequestD='$loanRequestD',propertyD='$propertyD',comment='$comment' WHERE ref_id=".$ref_id;
    }


    $result = mysqli_query($conn,$querry); 
    $querry1 = "UPDATE app_data SET status='$status' WHERE id=".$ref_id;
    $result1 = mysqli_query($conn,$querry1); 

    echo $result;
}


if($_POST['action'] == 'getSingleDataLoan'){
    $res_header = mysqli_query($conn, "SELECT * FROM loan_request Where ref_id=".$_POST['id']);
    while ($row_header = mysqli_fetch_assoc($res_header)) {
        $response[] = $row_header;
    
    }
    echo json_encode($response);
}

if($_POST['action'] == 'submit-net-worth'){
 
    $ref_id =  $_POST['ref_id'];

    $c_loanAmount =  $_POST['c_loanAmount'];
    $c_intrestRate =  $_POST['c_intrestRate'];
    $c_months =  $_POST['c_months'];
    $c_emi =  $_POST['c_emi'];

    $ammountPEMI =  $_POST['ammountPEMI'];
    $EMI1 =  $_POST['EMI1'];
    $EMI2 =  $_POST['EMI2'];
    $IIR1 =  $_POST['IIR1'];
    $IIR2 =  $_POST['IIR2'];
    $netWorth1 =  $_POST['netWorth1'];
    $netWorth2 =  $_POST['netWorth2'];
    $totalNetWorth =  $_POST['totalNetWorth'];
    $loanAmmount =  $_POST['loanAmmount'];
    $loanAmountRatio =  $_POST['loanAmountRatio'];
    $status = $_POST['status'];
    // echo "<pre>"; print_r($_POST); die;

    //$querry = "INSERT INTO net_worth(ref_id,c_loanAmount, c_intrestRate, c_months, c_emi, ammountPEMI, EMI1, EMI2, IIR1, IIR2, netWorth1, netWorth2, totalNetWorth, loanAmmount, loanAmountRatio) VALUES ('$ref_id','$c_loanAmount', '$c_intrestRate', '$c_months', '$c_emi', '$ammountPEMI', '$EMI1', '$EMI2', '$IIR1', '$IIR2', '$netWorth1', '$netWorth2', '$totalNetWorth', '$loanAmmount', '$loanAmountRatio')";
    $res_net_worth = mysqli_query($conn, "SELECT * FROM net_worth WHERE ref_id=" . $ref_id);

    if ($res_net_worth->num_rows == 0) {
        $querry = "INSERT INTO net_worth(ref_id,c_loanAmount, c_intrestRate, c_months, c_emi, ammountPEMI, EMI1, EMI2, IIR1, IIR2, netWorth1, netWorth2, totalNetWorth, loanAmmount, loanAmountRatio) VALUES ('$ref_id','$c_loanAmount', '$c_intrestRate', '$c_months', '$c_emi', '$ammountPEMI', '$EMI1', '$EMI2', '$IIR1', '$IIR2', '$netWorth1', '$netWorth2', '$totalNetWorth', '$loanAmmount', '$loanAmountRatio')";
    } else {
        $querry = "UPDATE net_worth SET c_loanAmount='$c_loanAmount', c_intrestRate='$c_intrestRate', c_months='$c_months', c_emi='$c_emi', ammountPEMI='$ammountPEMI', EMI1='$EMI1', EMI2='$EMI2', IIR1='$IIR1', IIR2='$IIR2', netWorth1='$netWorth1', netWorth2='$netWorth2', totalNetWorth='$totalNetWorth', loanAmmount='$loanAmmount', loanAmountRatio='$loanAmountRatio' WHERE ref_id=" . $ref_id;
    }

    $result = mysqli_query($conn,$querry); 
    $querry1 = "UPDATE app_data SET status='$status' WHERE id=".$ref_id;
    $result1 = mysqli_query($conn,$querry1); 

    echo $result;
    
}

if($_POST['action'] == 'getSingleNetWorth'){
    $res_header = mysqli_query($conn, "SELECT * FROM net_worth Where ref_id=".$_POST['id']);
    while ($row_header = mysqli_fetch_assoc($res_header)) {
        $response[] = $row_header;
    
    }
    echo json_encode($response);
}


if($_POST['action'] == 'submit-client-visit'){
 
    $ref_id =  $_POST['ref_id'];

    // $ref_id =  $_POST['openId'];
    $name1 =  $_POST['name1'];
    $name2 =  $_POST['name2'];
    $designation1 =  $_POST['designation1'];
    $designation2 =  $_POST['designation2'];
    $visitDate1 =  $_POST['visitDate1'];
    $visitDate2 =  $_POST['visitDate2'];
    $comment1 =  $_POST['comment1'];
    $comment2 =  $_POST['comment2'];
    $comment3 =  $_POST['comment3'];
    $comment4 =  $_POST['comment4'];
    $g_visitDate =  $_POST['g_visitDate'];
    $status = $_POST['status'];

    // echo "<pre>"; print_r($_POST); die;
    
    //$querry = "INSERT INTO client_visit(ref_id, name1, name2, designation1, designation2, visitDate1, visitDate2, comment1, comment2, comment3, comment4, g_visitDate) VALUES ('$ref_id', '$name1', '$name2', '$designation1', '$designation2', '$visitDate1', '$visitDate2', '$comment1', '$comment2', '$comment3', '$comment4', '$g_visitDate')";
    $res_client_visit = mysqli_query($conn, "SELECT * FROM client_visit WHERE ref_id=" . $ref_id);

    if ($res_client_visit->num_rows == 0) {
        $querry = "INSERT INTO client_visit(ref_id, name1, name2, designation1, designation2, visitDate1, visitDate2, comment1, comment2, comment3, comment4, g_visitDate) VALUES ('$ref_id', '$name1', '$name2', '$designation1', '$designation2', '$visitDate1', '$visitDate2', '$comment1', '$comment2', '$comment3', '$comment4', '$g_visitDate')";
    } else {
        $querry = "UPDATE client_visit SET name1='$name1', name2='$name2', designation1='$designation1', designation2='$designation2', visitDate1='$visitDate1', visitDate2='$visitDate2', comment1='$comment1', comment2='$comment2', comment3='$comment3', comment4='$comment4', g_visitDate='$g_visitDate' WHERE ref_id=" . $ref_id;
    }

    $result = mysqli_query($conn,$querry); 
    $querry1 = "UPDATE app_data SET status='$status' WHERE id=".$ref_id;
    $result1 = mysqli_query($conn,$querry1); 

    echo $result;
    
}

if($_POST['action'] == 'getSingleClientVisit'){
    $res_header = mysqli_query($conn, "SELECT * FROM client_visit Where ref_id=".$_POST['id']);
    while ($row_header = mysqli_fetch_assoc($res_header)) {
        $response[] = $row_header;
    
    }
    echo json_encode($response);
}


if($_POST['action'] == 'submit-site-visit'){
 
    $ref_id =  $_POST['ref_id'];


    $name1 =  $_POST['name1'];
    $name2 =  $_POST['name2'];
    $designation1 =  $_POST['designation1'];
    $designation2 =  $_POST['designation2'];
    $visitDate1 =  $_POST['visitDate1'];
    $visitDate2 =  $_POST['visitDate2'];
    $details =  $_POST['details'];
    $mValue =  $_POST['mValue'];
    $dsValue =  $_POST['dsValue'];
    $reportDate =  $_POST['reportDate'];
    $valuerName =  $_POST['valuerName'];
    $comments1 =  $_POST['comments1'];
    $advocateName =  $_POST['advocateName'];
    $reportDate2 =  $_POST['reportDate2'];
    $comments2 =  $_POST['comments2'];
    $comments3 =  $_POST['comments3'];
    $status = $_POST['status'];
    
    //$querry = "INSERT INTO site_visit(ref_id, name1, name2, designation1, designation2, visitDate1, visitDate2, details, mValue, dsValue, reportDate, valuerName, comments1, advocateName, reportDate2, comments2, comments3) VALUES ('$ref_id', '$name1', '$name2', '$designation1', '$designation2', '$visitDate1', '$visitDate2', '$details', '$mValue', '$dsValue', '$reportDate', '$valuerName', '$comments1', '$advocateName', '$reportDate2', '$comments2', '$comments3')";
    $res_site_visit = mysqli_query($conn, "SELECT * FROM site_visit WHERE ref_id=" . $ref_id);

    if ($res_site_visit->num_rows == 0) {
        $querry = "INSERT INTO site_visit(ref_id, name1, name2, designation1, designation2, visitDate1, visitDate2, details, mValue, dsValue, reportDate, valuerName, comments1, advocateName, reportDate2, comments2, comments3) VALUES ('$ref_id', '$name1', '$name2', '$designation1', '$designation2', '$visitDate1', '$visitDate2', '$details', '$mValue', '$dsValue', '$reportDate', '$valuerName', '$comments1', '$advocateName', '$reportDate2', '$comments2', '$comments3')";
    } else {
        $querry = "UPDATE site_visit SET name1='$name1', name2='$name2', designation1='$designation1', designation2='$designation2', visitDate1='$visitDate1', visitDate2='$visitDate2', details='$details', mValue='$mValue', dsValue='$dsValue', reportDate='$reportDate', valuerName='$valuerName', comments1='$comments1', advocateName='$advocateName', reportDate2='$reportDate2', comments2='$comments2', comments3='$comments3' WHERE ref_id=" . $ref_id;
    }

    $result = mysqli_query($conn,$querry); 
    $querry1 = "UPDATE app_data SET status='$status' WHERE id=".$ref_id;
    $result1 = mysqli_query($conn,$querry1); 

    echo $result;
    
}

if($_POST['action'] == 'getSingleSiteVisit'){
    $res_header = mysqli_query($conn, "SELECT * FROM site_visit Where ref_id=".$_POST['id']);
    while ($row_header = mysqli_fetch_assoc($res_header)) {
        $response[] = $row_header;
    
    }
    echo json_encode($response);
}


if($_POST['action'] == 'submit-risk-1'){
 
    $ref_id =  $_POST['ref_id'];

    $JsonData =  $_POST['JsonData'];
    $status = $_POST['status'];
    // echo "<pre>"; print_r($_POST); die;
    //$querry = "INSERT INTO risk_one(ref_id, JsonData) VALUES ('$ref_id', '$JsonData')";
    $res_risk_one = mysqli_query($conn, "SELECT * FROM risk_one WHERE ref_id=" . $ref_id);

    if ($res_risk_one->num_rows == 0) {
        $querry = "INSERT INTO risk_one(ref_id, JsonData) VALUES ('$ref_id', '$JsonData')";
    } else {
        $querry = "UPDATE risk_one SET JsonData='$JsonData' WHERE ref_id=" . $ref_id;
    }

    $result = mysqli_query($conn,$querry); 

    $querry1 = "UPDATE app_data SET status='$status' WHERE id=".$ref_id;
    $result1 = mysqli_query($conn,$querry1); 

    echo $result;
    
}

if($_POST['action'] == 'getSinglerisk-1'){
    $res_header = mysqli_query($conn, "SELECT * FROM risk_one Where ref_id=".$_POST['id']);
    while ($row_header = mysqli_fetch_assoc($res_header)) {
        $response[] = $row_header;
    
    }
    echo json_encode($response);
}


if($_POST['action'] == 'submit-risk-2'){
 
    $ref_id =  $_POST['ref_id'];

    $JsonData =  $_POST['JsonData'];
    $status = $_POST['status'];
    
    //$querry = "INSERT INTO risk_two(ref_id, JsonData) VALUES ('$ref_id', '$JsonData')";
    $res_risk_two = mysqli_query($conn, "SELECT * FROM risk_two WHERE ref_id=" . $ref_id);

    if ($res_risk_two->num_rows == 0) {
        $querry = "INSERT INTO risk_two(ref_id, JsonData) VALUES ('$ref_id', '$JsonData')";
    } else {
        $querry = "UPDATE risk_two SET JsonData='$JsonData' WHERE ref_id=" . $ref_id;
    }

    $result = mysqli_query($conn,$querry); 
    $querry1 = "UPDATE app_data SET status='$status' WHERE id=".$ref_id;
    $result1 = mysqli_query($conn,$querry1); 

    echo $result;
    
}

if($_POST['action'] == 'getSinglerisk-2'){
    $res_header = mysqli_query($conn, "SELECT * FROM risk_two Where ref_id=".$_POST['id']);
    while ($row_header = mysqli_fetch_assoc($res_header)) {
        $response[] = $row_header;
    
    }
    echo json_encode($response);
}

if($_POST['action'] == 'submit-add-info'){
 
    $ref_id =  $_POST['ref_id'];

    $JsonData =  $_POST['JsonData'];
    $status = $_POST['status'];

    $noi =  $_POST['noi'];
    $EMI =  $_POST['EMI'];
    $terms =  $_POST['terms'];
    // echo "<pre>"; print_r($_POST); die;
    
    //$querry = "INSERT INTO addinfo(ref_id, JsonData) VALUES ('$ref_id', '$JsonData')";
    $res_addinfo = mysqli_query($conn, "SELECT * FROM addinfo WHERE ref_id=" . $ref_id);

    if ($res_addinfo->num_rows == 0) {
        // No record found, perform INSERT operation
        $querry = "INSERT INTO addinfo(ref_id, JsonData, terms) VALUES ('$ref_id', '$JsonData','$terms')";
    } else {
        // Record found, perform UPDATE operation
        $querry = "UPDATE addinfo SET JsonData='$JsonData',terms='$terms'  WHERE ref_id=" . $ref_id;
    }

    $result = mysqli_query($conn,$querry); 

    $querry2 = "UPDATE net_worth SET c_months='$noi',c_emi='$EMI' WHERE ref_id=".$_POST['ref_id'];

    $result2 = mysqli_query($conn,$querry2); 

    $querry1 = "UPDATE app_data SET status='$status' WHERE id=".$ref_id;
    $result1 = mysqli_query($conn,$querry1); 

    echo $result2;
    
}

if($_POST['action'] == 'getaddinfo'){
    $res_header = mysqli_query($conn, "SELECT * FROM addinfo Where ref_id=".$_POST['id']);
    while ($row_header = mysqli_fetch_assoc($res_header)) {
        $response[] = $row_header;
    }
    echo json_encode($response);
}

if($_POST['action'] == 'saveMediaFile'){
    ini_set('display_errors', 1);
    ini_set('display_startup_errors', 1);
    error_reporting(E_ALL);
    $target_dir = "uploads/";
    // $target_file = time().basename($_FILES["file"]["name"]);
    $target_file = time().'.'.basename($_FILES["file"]["type"]);
    $result = move_uploaded_file($_FILES["file"]["tmp_name"], $target_dir .$target_file);

    $ref_id =  $_POST['ref_id'];
    $type =  $_POST['type'];
    $comment =  $_POST['comment'];   
    $filename =  $target_file;
    
    $querry = "INSERT INTO media(ref_id,type,comment, filename) VALUES ('$ref_id','$type','$comment','$filename')";

    $result = mysqli_query($conn,$querry);

    echo $result;

}

if($_POST['action'] == 'getMediaFile'){
    $res_header = mysqli_query($conn, "SELECT * FROM media Where ref_id=".$_POST['id']);
    while ($row_header = mysqli_fetch_assoc($res_header)) {
        $response[] = $row_header;
    
    }
    echo json_encode($response);
}


if ($_POST['action'] == 'savePdfFile') {
    // ini_set('display_errors', 1);
    // ini_set('display_startup_errors', 1);
    // error_reporting(E_ALL);
    $response = array("success" => false, "message" => "");
    $target_dir = "uploads/";

    // $target_file = time() . basename($_FILES["file"]["name"]);

    $target_file = time().'.'.basename($_FILES["file"]["type"]);

    if (move_uploaded_file($_FILES["file"]["tmp_name"], $target_dir . $target_file)) {
        $ref_id = $_POST['ref_id'];
        $type = $_POST['type'];
        $filename = $target_file;

        // Check if a record with the given ref_id and type already exists
        $checkQuery = "SELECT * FROM pdf_files WHERE ref_id = '$ref_id' AND type = '$type'";
        $checkResult = mysqli_query($conn, $checkQuery);

        if ($checkResult) {
            if (mysqli_num_rows($checkResult) > 0) {
                // If the record exists, update the filename
                $updateQuery = "UPDATE pdf_files SET filename = '$filename' WHERE ref_id = '$ref_id' AND type = '$type'";
                $updateResult = mysqli_query($conn, $updateQuery);

                if ($updateResult) {
                    $response["success"] = true;
                    $response["message"] = "Update successful";
                } else {
                    $response["message"] = "Update failed";
                    $response["error"] = mysqli_error($conn);
                }
            } else {
                // If the record doesn't exist, insert a new record
                $insertQuery = "INSERT INTO pdf_files(ref_id, type, filename) VALUES ('$ref_id', '$type', '$filename')";
                $insertResult = mysqli_query($conn, $insertQuery);

                if ($insertResult) {
                    $response["success"] = true;
                    $response["message"] = "Insert successful";
                } else {
                    $response["message"] = "Insert failed";
                    $response["error"] = mysqli_error($conn);
                }
            }
        } else {
            $response["message"] = "Check error";
            $response["error"] = mysqli_error($conn);
        }
    } else {
        // Get detailed error information about the last error
        $lastError = error_get_last();
        $response["message"] = "Could not move uploaded file";
        $response["errorDetails"] = $lastError;
    }
    echo json_encode($response);
}

if ($_POST['action'] === 'getPdfFiles') {
    $ref_id = $_POST['ref_id'];
    
    // Adjust the table name and column names accordingly
    $query = "SELECT filename, type FROM pdf_files WHERE ref_id = '$ref_id'";
    $result = mysqli_query($conn, $query);
    if ($result) {
        $pdfFiles = [];
        while ($row = mysqli_fetch_assoc($result)) {
            $pdfFiles[] = $row;
        }
        
        echo json_encode($pdfFiles);
    } else {
        echo json_encode(['error' => 'Failed to retrieve PDF files.']);
    }
}

if($_POST['action'] == 'deleteMediaFile'){

    // ini_set('display_errors', 1);
    // ini_set('display_startup_errors', 1);
    // error_reporting(E_ALL);

    // $res_header = mysqli_query($conn, "SELECT * FROM media Where id=".$_POST['id']);
    // while ($row_header = mysqli_fetch_assoc($res_header)) {
    //     $response[] = $row_header;
    
    // }

    // if (count($response) > 0) {
    // //     // echo json_encode("email found");
    // // $status = unlink("/opt/lampp/htdocs/29nov/homeloan/admin/uploads/".$response[0]['filename'])
    //     if(is_file(getcwd()."/"."uploads"."/".$response[0]['filename'])){

    //         $status = unlink(getcwd()."/"."uploads"."/".$response[0]['filename']);
    //     }
    // }

    $result = mysqli_query($conn, "DELETE FROM media Where id=".$_POST['id']);
    echo $result;
}

if($_POST['action'] == 'getDoc1Data'){
    // ini_set('display_errors', 1);
    // ini_set('display_startup_errors', 1);
    // error_reporting(E_ALL);
    $res_header = mysqli_query($conn, "SELECT * FROM loan_request Where ref_id=".$_POST['id']);
    while ($row_header = mysqli_fetch_assoc($res_header)) {
        $response['loan_request'] = $row_header;
    }
    $res_header = mysqli_query($conn, "SELECT * FROM net_worth Where ref_id=".$_POST['id']);
    while ($row_header = mysqli_fetch_assoc($res_header)) {
        $response['net_worth'] = $row_header;
    }
    $res_header = mysqli_query($conn, "SELECT * FROM guar_data Where ref_id=".$_POST['id']);
    while ($row_header = mysqli_fetch_assoc($res_header)) {
        $response['guar_data'] = $row_header;
    }
    $res_header = mysqli_query($conn, "SELECT * FROM app_data Where id=".$_POST['id']);
    while ($row_header = mysqli_fetch_assoc($res_header)) {
        $response['app_data'] = $row_header;
    }
    $res_header = mysqli_query($conn, "SELECT * FROM client_visit Where ref_id=".$_POST['id']);
    while ($row_header = mysqli_fetch_assoc($res_header)) {
        $response['client_visit'] = $row_header;
    }
    $res_header = mysqli_query($conn, "SELECT * FROM site_visit Where ref_id=".$_POST['id']);
    while ($row_header = mysqli_fetch_assoc($res_header)) {
        $response['site_visit'] = $row_header;
    }
    $res_header = mysqli_query($conn, "SELECT * FROM risk_one Where ref_id=".$_POST['id']);
    while ($row_header = mysqli_fetch_assoc($res_header)) {
        $response['risk_one'] = $row_header;
    }
    $res_header = mysqli_query($conn, "SELECT * FROM risk_two Where ref_id=".$_POST['id']);
    while ($row_header = mysqli_fetch_assoc($res_header)) {
        $response['risk_two'] = $row_header;
    }
    $res_header = mysqli_query($conn, "SELECT * FROM addinfo Where ref_id=".$_POST['id']);
    while ($row_header = mysqli_fetch_assoc($res_header)) {
        $response['addinfo'] = $row_header;
    }
    $res_header = mysqli_query($conn, "SELECT * FROM score Where ref_id=".$_POST['id']);
    while ($row_header = mysqli_fetch_assoc($res_header)) {
        $response['score'] = $row_header;
    }

    $ref_id = $_POST['id'];
    $res_header = mysqli_query($conn, "SELECT * FROM media WHERE ref_id = '$ref_id' AND type = '1'");
    while ($row_header = mysqli_fetch_assoc($res_header)) {
        $response['media'][] = $row_header;
    }
    echo json_encode($response);
}

if($_POST['action']  == 'deleteAppDataList'){

    // ini_set('display_errors', 1);
    // ini_set('display_startup_errors', 1);
    // error_reporting(E_ALL);

    // $res_header = mysqli_query($conn, "SELECT * FROM app_data Where id=".$_POST['id']);
    // while ($row_header = mysqli_fetch_assoc($res_header)) {
    //     $response[] = $row_header;
    
    // }

    // if (count($response) > 0) {
    //     if(is_file(getcwd()."/"."uploads"."/".$response[0]['a1_photo'])){
    //         $status = unlink(getcwd()."/"."uploads"."/".$response[0]['a1_photo']);
    //     }
    //     if(is_file(getcwd()."/"."uploads"."/".$response[0]['a2_photo'])){
    //         $status1 = unlink(getcwd()."/"."uploads"."/".$response[0]['a2_photo']);
    //     }
    // }

    // $res_header1 = mysqli_query($conn, "SELECT * FROM guar_data Where ref_id=".$_POST['id']);
    // while ($res_header1 = mysqli_fetch_assoc($res_header1)) {
    //     $response1[] = $res_header1;
    // }

    // if (count($response1) > 0) {
    //     if(is_file(getcwd()."/"."uploads"."/".$response1[0]['a1_photo'])){
    //         $status2 = unlink(getcwd()."/"."uploads"."/".$response1[0]['a1_photo']);
    //     }
    //     if(is_file(getcwd()."/"."uploads"."/".$response1[0]['a2_photo'])){
    //         $status3 = unlink(getcwd()."/"."uploads"."/".$response1[0]['a2_photo']);
    //     }
    // }

    // $res_header2 = mysqli_query($conn, "SELECT * FROM media Where ref_id=".$_POST['id']);

    // while ($row2 = mysqli_fetch_array($res_header2)) {
    //     if(is_file(getcwd()."/"."uploads"."/".$row2['filename'])){
    //         $status2 = unlink(getcwd()."/"."uploads"."/".$row2['filename']);
    //     }
    //     $result2 = mysqli_query($conn, "DELETE FROM media WHERE id=".$row2['id']." LIMIT 1");
    //     // unlink($image_url);
    //     if($result2){
    //         // header('Location: ' . $_SERVER['HTTP_REFERER']);
    //     } else {
    //         echo "Failed to delete of media files";
    //     }
    // }

    // // $query = "SELECT filename, type FROM pdf_files WHERE ref_id = '$ref_id'";
    // $res_header3 = mysqli_query($conn, "SELECT * FROM pdf_files Where ref_id=".$_POST['id']);
    // while ($row3 = mysqli_fetch_array($res_header3)) {
    //     if(is_file(getcwd()."/"."uploads"."/".$row3['filename'])){
    //         $status3 = unlink(getcwd()."/"."uploads"."/".$row3['filename']);
    //     }
    //     $result3 = mysqli_query($conn, "DELETE FROM pdf_files WHERE id=".$row3['id']." LIMIT 1");
    //     // unlink($image_url);
    //     if($result3){
    //         // header('Location: ' . $_SERVER['HTTP_REFERER']);
    //     } else {
    //         echo "Failed to delete of PDF files";
    //     }
    // }
   


    $result = mysqli_query($conn, "DELETE FROM app_data Where id=".$_POST['id']);
    echo $result;
}

if($_POST['action'] == 'scoreSubmit'){
 
    $ref_id =  $_POST['ref_id'];

    $JsonData =  $_POST['JsonData'];

    $m_score =  $_POST['m_score'];

    $total1 =  $_POST['total1'];

    $total2 =  $_POST['total2'];
    $status = $_POST['status'];
    // echo "<pre>"; print_r($_POST); die;
    // ini_set('display_errors', 1);
    // ini_set('display_startup_errors', 1);
    // error_reporting(E_ALL);
    
    $querry = "INSERT INTO score(ref_id, m_score,total1,total2) VALUES ('$ref_id', '$m_score', '$total1', '$total2')";

    $result = mysqli_query($conn,$querry); 
    $querry1 = "UPDATE app_data SET status='$status' WHERE id=".$ref_id;
    $result1 = mysqli_query($conn,$querry1); 

    echo $result;
    
}

if($_POST['action'] == 'getScore'){
    $res_header = mysqli_query($conn, "SELECT * FROM score Where ref_id=".$_POST['id']);
    while ($row_header = mysqli_fetch_assoc($res_header)) {
        $response[] = $row_header;
    
    }
    echo json_encode($response);
}


if($_POST['action'] == 'getUsers'){
    $res_header = mysqli_query($conn, "SELECT * FROM users where type != 'Admin'");
    while ($row_header = mysqli_fetch_assoc($res_header)) {
        $response[] = $row_header;
    
    }
    echo json_encode($response);
}

if($_POST['action'] == 'getUser'){
    // echo "<pre>"; print_r($_POST); die;
    $res_header = mysqli_query($conn, "SELECT * FROM users where id = ".$_POST['id']);
    while ($row_header = mysqli_fetch_assoc($res_header)) {
        $response[] = $row_header;
    
    }
    echo json_encode($response);
}


if($_POST['action'] == 'addUser'){
    $f_name = $_POST['f_name'];
    $l_name = $_POST['l_name'];
    $email = $_POST['email'];
    $password = $_POST['password'];
    $type = $_POST['type'];
    $username = $_POST['username'];
    // ini_set('display_errors', 1);
    // ini_set('display_startup_errors', 1);
    // error_reporting(E_ALL);

    $quarry = "SELECT * FROM users WHERE email='$email'";
    $result = mysqli_query($conn, $quarry);

    $response = [];

    if ($result !== false) {
        while ($row_header = mysqli_fetch_assoc($result)) {
            $response[] = $row_header;
        }
    }

    if (count($response) > 0) {
        echo json_encode("email found");
        die;
    }

    $quarry1 = "SELECT * FROM users WHERE username='$username'";
    $result1 = mysqli_query($conn, $quarry1);

    $response1 = [];

    if ($result1 !== false) {
        while ($row_header1 = mysqli_fetch_assoc($result1)) {
            $response1[] = $row_header1;
        }
    }

    if (count($response1) > 0) {
        echo json_encode("Username found");
        die;
    }
     /****************send mail****************** */
    $to = $email;
    // $to = "somebody@example.com, somebodyelse@example.com";
    $subject = "HTML email";

    $message = "
    <html>
    <head>
    <title>Home Loan</title>
    </head>
    <body>
    <p>This email contains HTML Tags!</p>
    <table>
    <tr>
    <th>Login Url</th>
    <th>Email</th>
    <th>Password</th>
    </tr>
    <tr>
    <td>https://www.acramm.com/homeloan/login</td>
    <td>".$email."</td>
    <td>".$password."</td>
    </tr>
    </table>
    </body>
    </html>
    ";

    // Always set content-type when sending HTML email
    $headers = "MIME-Version: 1.0" . "\r\n";
    $headers .= "Content-type:text/html;charset=UTF-8" . "\r\n";

    // More headers
    $headers .= 'From: <homeloan@info.com>' . "\r\n";
    // $headers .= 'Cc: myboss@example.com' . "\r\n";

    mail($to,$subject,$message,$headers);
    /****************send mail****************** */

    // Check if a file was uploaded
    if (isset($_FILES['photo']) && $_FILES['photo']['error'] == UPLOAD_ERR_OK) {
        $target_dir = "uploads/";
        // $target_file = time() . basename($_FILES["photo"]["name"]);
        $target_file = time().'.'.basename($_FILES["photo"]["type"]);

        // Move the uploaded file to the target directory
        $result = move_uploaded_file($_FILES["photo"]["tmp_name"], $target_dir . $target_file);

        // Check if the file was moved successfully
        if ($result) {
            $querry = "INSERT INTO users(f_name, l_name, email, password, username, type, photo) VALUES ('$f_name', '$l_name', '$email', '$password','$username', '$type', '$target_file')";
            $result = mysqli_query($conn, $querry);
            echo $result;
        } else {
            echo "Upload failed";
        }
    } else {
        $querry = "INSERT INTO users(f_name, l_name, email, password,username, type) VALUES ('$f_name', '$l_name', '$email', '$password','$username', '$type')";
        $result = mysqli_query($conn, $querry);
        echo $result;
    }
}


if ($_POST['action'] == 'updateUser') {
    $id = $_POST['id'];
    $f_name = $_POST['f_name'];
    $l_name = $_POST['l_name'];
    $email = $_POST['email'];
    $password = $_POST['password'];
    $type = $_POST['type'];
    $username = $_POST['username'];

    // Check if a file was uploaded
    if (isset($_FILES['photo']) && $_FILES['photo']['error'] == UPLOAD_ERR_OK) {
        $target_dir = "uploads/";
        // $target_file = time() . basename($_FILES["photo"]["name"]);
        $target_file = time().'.'.basename($_FILES["photo"]["type"]);
        

        // Move the uploaded file to the target directory
        $result = move_uploaded_file($_FILES["photo"]["tmp_name"], $target_dir . $target_file);

        // Check if the file was moved successfully
        if ($result) {
            // Update the user with the new photo filename
            $querry = "UPDATE users SET f_name='$f_name', l_name='$l_name', email='$email', password='$password', username='$username', type='$type', photo='$target_file' WHERE id=".$id;
            $result = mysqli_query($conn, $querry);
            echo $result;
        } else {
            echo "Upload failed";
        }
    } else {
        // If no photo was uploaded, update without changing the existing photo filename
        $querry = "UPDATE users SET f_name='$f_name', l_name='$l_name', email='$email', password='$password', username='$username', type='$type' WHERE id=".$id;
        $result = mysqli_query($conn, $querry);
        echo $result;
    }
}


if($_POST['action']  == 'deleteUser'){
    $result = mysqli_query($conn, "DELETE FROM users Where id=".$_POST['id']);
    echo $result;
}

if ($_POST['action'] == 'loginUser') {
    // $email = $_POST['email'];
    $username = $_POST['username'];
    $password = $_POST['password'];

    // $quarry1 = "SELECT * FROM users WHERE email='$email'";
    $quarry1 = "SELECT * FROM users WHERE username='$username'";
    $result1 = mysqli_query($conn, $quarry1);
    $response1 = [];
    if ($result1 !== false) {
        while ($row_header1 = mysqli_fetch_assoc($result1)) {
            $response1[] = $row_header1;
        }
    }

    if (count($response1) == 0) {
        echo json_encode("username not found");
        die;
    }

    // echo "<pre>"; print_r(mysqli_fetch_assoc($result1)); die;

    $quarry = "SELECT * FROM users WHERE username='$username' AND password='$password'";
    $result = mysqli_query($conn, $quarry);

    $response = [];

    if ($result !== false) {
        while ($row_header = mysqli_fetch_assoc($result)) {
            $response[] = $row_header;
        }
    }

    if (count($response) > 0) {
        echo json_encode(base64_encode(json_encode($response[0])));
    } else {
        echo json_encode(null);
    }
}

if($_POST['action'] == 'submit-all-forms'){
 
    $ref_id =  $_POST['ref_id'];

    $status = $_POST['status'];

    // echo "<pre>"; print_r($_POST); die;

    $querry1 = "UPDATE app_data SET status='$status' WHERE id=".$ref_id;
    $result1 = mysqli_query($conn,$querry1); 

    echo $result1;
    
}