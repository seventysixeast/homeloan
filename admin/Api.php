<?php
include('config.php');    



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

     if($_FILES["a1_photo"] != ''){

        $target_dir = "uploads/";
        $target_file_one = time().basename($_FILES["a1_photo"]["name"]);
        move_uploaded_file($_FILES["a1_photo"]["tmp_name"], $target_dir .$target_file_one);
    }

    if($_FILES["a2_photo"] != ''){        
        $target_dir = "uploads/";
        $target_file_two = time().basename($_FILES["a2_photo"]["name"]);
        move_uploaded_file($_FILES["a2_photo"]["tmp_name"], $target_dir .$target_file_two);   
    }

    if($id == 0){
        $querry = "INSERT INTO app_data(a1_name, a1_fName, a1_activity , a1_paddress, a1_age, a1_nrc, a1_phone, a1_passport, a1_photo, a2_name, a2_fName, a2_activity, a2_paddress, a2_age, a2_nrc, a2_phone, a2_passport, a2_photo, app_date) VALUES('$a1_name', '$a1_fName', '$a1_activity','$a1_paddress' ,  '$a1_age', '$a1_nrc', '$a1_phone', '$a1_passport', '$target_file_one', '$a2_name', '$a2_fName', '$a2_activity', '$a2_paddress', '$a2_age', '$a2_nrc', '$a2_phone', '$a2_passport', '$target_file_two', '$app_date')";
    }else{
        if($_FILES["a1_photo"] != ''){
            $querry = "UPDATE app_data SET a1_name='$a1_name',a1_fName='$a1_fName',a1_activity='$a1_activity',a1_paddress='$a1_paddress',a1_age='$a1_age',a1_nrc='$a1_nrc',a1_phone='$a1_phone',a1_passport='$a1_passport',a1_photo='$target_file_one',a2_name='$a2_name',a2_fName='$a2_fName',a2_activity='$a2_activity',a2_paddress='$a2_paddress',a2_age='$a2_age',a2_nrc='$a2_nrc',a2_phone='$a2_phone',a2_passport='$a2_passport',app_date='$app_date' WHERE id=".$id;
        }
        if($_FILES["a2_photo"] != ''){
           $querry = "UPDATE app_data SET a1_name='$a1_name',a1_fName='$a1_fName',a1_activity='$a1_activity',a1_paddress='$a1_paddress',a1_age='$a1_age',a1_nrc='$a1_nrc',a1_phone='$a1_phone',a1_passport='$a1_passport',a2_name='$a2_name',a2_fName='$a2_fName',a2_activity='$a2_activity',a2_paddress='$a2_paddress',a2_age='$a2_age',a2_nrc='$a2_nrc',a2_phone='$a2_phone',a2_passport='$a2_passport',a2_photo='$target_file_two',app_date='$app_date' WHERE id=".$id;
        }

        if($_FILES["a1_photo"] == '' && $_FILES["a2_photo"] == ''){
           $querry = "UPDATE app_data SET a1_name='$a1_name',a1_fName='$a1_fName',a1_activity='$a1_activity',a1_paddress='$a1_paddress',a1_age='$a1_age',a1_nrc='$a1_nrc',a1_phone='$a1_phone',a1_passport='$a1_passport',a2_name='$a2_name',a2_fName='$a2_fName',a2_activity='$a2_activity',a2_paddress='$a2_paddress',a2_age='$a2_age',a2_nrc='$a2_nrc',a2_phone='$a2_phone',a2_passport='$a2_passport',app_date='$app_date' WHERE id=".$id;
        }

        if($_FILES["a1_photo"] != '' && $_FILES["a2_photo"] != ''){
           $querry = "UPDATE app_data SET a1_name='$a1_name',a1_fName='$a1_fName',a1_activity='$a1_activity',a1_paddress='$a1_paddress',a1_age='$a1_age',a1_nrc='$a1_nrc',a1_phone='$a1_phone',a1_passport='$a1_passport',a2_name='$a2_name',a2_fName='$a2_fName',a2_activity='$a2_activity',a2_paddress='$a2_paddress',a2_age='$a2_age',a2_nrc='$a2_nrc',a2_phone='$a2_phone',a2_passport='$a2_passport',app_date='$app_date' ,a1_photo='$target_file_one',a2_photo='$target_file_two' WHERE id=".$id;
        }
    }

    $result = mysqli_query($conn,$querry); 

        // Get last insert id 
        $lastInsertID = mysqli_insert_id($conn); 

        // echo "Last insert ID : ".$lastInsertID; 

    echo $lastInsertID;
}

if($_POST['action'] == 'getAppDataList'){
    $res_header = mysqli_query($conn, "SELECT * FROM app_data");
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


     if($_FILES["a1_photo"] != ''){
        $target_dir = "uploads/";
        $target_file_one = time().basename($_FILES["a1_photo"]["name"]);
        move_uploaded_file($_FILES["a1_photo"]["tmp_name"], $target_dir .$target_file_one);
    }

    if($_FILES["a2_photo"] != ''){        
        $target_dir = "uploads/";
        $target_file_two = time().basename($_FILES["a2_photo"]["name"]);
        move_uploaded_file($_FILES["a2_photo"]["tmp_name"], $target_dir .$target_file_two);   
    }

    $res_header = mysqli_query($conn, "SELECT * FROM guar_data Where ref_id=".$ref_id);

    if($res_header->num_rows == 0){
        $querry = "INSERT INTO guar_data(ref_id,a1_name, a1_fName, a1_activity,a1_paddress, a1_age, a1_nrc, a1_phone, a1_passport, a1_photo, a2_name, a2_fName, a2_activity, a2_paddress, a2_age, a2_nrc, a2_phone, a2_passport, a2_photo, app_date) VALUES('$ref_id','$a1_name', '$a1_fName', '$a1_activity','$a1_paddress', '$a1_age', '$a1_nrc', '$a1_phone', '$a1_passport', '$target_file_one', '$a2_name', '$a2_fName', '$a2_activity', '$a2_paddress', '$a2_age', '$a2_nrc', '$a2_phone', '$a2_passport', '$target_file_two', '$app_date')";
    }else{

        if($_FILES["a1_photo"] != ''){
            $querry = "UPDATE guar_data SET ref_id='$ref_id',a1_name='$a1_name',a1_fName='$a1_fName',a1_activity='$a1_activity',a1_paddress='$a1_paddress',a1_age='$a1_age',a1_nrc='$a1_nrc',a1_phone='$a1_phone',a1_passport='$a1_passport',a1_photo='$target_file_one',a2_name='$a2_name',a2_fName='$a2_fName',a2_activity='$a2_activity',a2_paddress='$a2_paddress',a2_age='$a2_age',a2_nrc='$a2_nrc',a2_phone='$a2_phone',a2_passport='$a2_passport' WHERE ref_id=".$ref_id;
        }
        if($_FILES["a2_photo"] != ''){
            $querry = "UPDATE guar_data SET ref_id='$ref_id',a1_name='$a1_name',a1_fName='$a1_fName',a1_activity='$a1_activity',a1_paddress='$a1_paddress',a1_age='$a1_age',a1_nrc='$a1_nrc',a1_phone='$a1_phone',a1_passport='$a1_passport',a2_name='$a2_name',a2_fName='$a2_fName',a2_activity='$a2_activity',a2_paddress='$a2_paddress',a2_age='$a2_age',a2_nrc='$a2_nrc',a2_phone='$a2_phone',a2_passport='$a2_passport',a2_photo='$target_file_two' WHERE ref_id=".$ref_id;
        }

        if($_FILES["a1_photo"] == '' && $_FILES["a2_photo"] == ''){
            $querry = "UPDATE guar_data SET ref_id='$ref_id',a1_name='$a1_name',a1_fName='$a1_fName',a1_activity='$a1_activity',a1_paddress='$a1_paddress',a1_age='$a1_age',a1_nrc='$a1_nrc',a1_phone='$a1_phone',a1_passport='$a1_passport',a2_name='$a2_name',a2_fName='$a2_fName',a2_activity='$a2_activity',a2_paddress='$a2_paddress',a2_age='$a2_age',a2_nrc='$a2_nrc',a2_phone='$a2_phone',a2_passport='$a2_passport' WHERE ref_id=".$ref_id;
        }

        if($_FILES["a1_photo"] != '' && $_FILES["a2_photo"] != ''){
            $querry = "UPDATE guar_data SET ref_id='$ref_id',a1_name='$a1_name',a1_fName='$a1_fName',a1_activity='$a1_activity',a1_paddress='$a1_paddress',a1_age='$a1_age',a1_nrc='$a1_nrc',a1_phone='$a1_phone',a1_passport='$a1_passport',a2_name='$a2_name',a2_fName='$a2_fName',a2_activity='$a2_activity',a2_paddress='$a2_paddress',a2_age='$a2_age',a2_nrc='$a2_nrc',a2_phone='$a2_phone',a2_passport='$a2_passport',a1_photo='$target_file_one',a2_photo='$target_file_two' WHERE ref_id=".$ref_id;
        }
    }

    $result = mysqli_query($conn,$querry); 
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

    $querry = "INSERT INTO loan_request(ref_id, dataJson, total, appMargin, appMarginD, marginAge, loanRequest, loanRequestD, propertyD, comment) VALUES ('$ref_id', '$dataJson', '$total', '$appMargin', '$appMarginD', '$marginAge', '$loanRequest', '$loanRequestD', '$propertyD', '$comment')";

    $result = mysqli_query($conn,$querry); 

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

    $querry = "INSERT INTO net_worth(ref_id,c_loanAmount, c_intrestRate, c_months, c_emi, ammountPEMI, EMI1, EMI2, IIR1, IIR2, netWorth1, netWorth2, totalNetWorth, loanAmmount, loanAmountRatio) VALUES ('$ref_id','$c_loanAmount', '$c_intrestRate', '$c_months', '$c_emi', '$ammountPEMI', '$EMI1', '$EMI2', '$IIR1', '$IIR2', '$netWorth1', '$netWorth2', '$totalNetWorth', '$loanAmmount', '$loanAmountRatio')";

    $result = mysqli_query($conn,$querry); 

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
    
    $querry = "INSERT INTO client_visit(ref_id, name1, name2, designation1, designation2, visitDate1, visitDate2, comment1, comment2, comment3, comment4, g_visitDate) VALUES ('$ref_id', '$name1', '$name2', '$designation1', '$designation2', '$visitDate1', '$visitDate2', '$comment1', '$comment2', '$comment3', '$comment4', '$g_visitDate')";

    $result = mysqli_query($conn,$querry); 

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
    
    $querry = "INSERT INTO site_visit(ref_id, name1, name2, designation1, designation2, visitDate1, visitDate2, details, mValue, dsValue, reportDate, valuerName, comments1, advocateName, reportDate2, comments2, comments3) VALUES ('$ref_id', '$name1', '$name2', '$designation1', '$designation2', '$visitDate1', '$visitDate2', '$details', '$mValue', '$dsValue', '$reportDate', '$valuerName', '$comments1', '$advocateName', '$reportDate2', '$comments2', '$comments3')";

    $result = mysqli_query($conn,$querry); 

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

    
    $querry = "INSERT INTO risk_one(ref_id, JsonData) VALUES ('$ref_id', '$JsonData')";

    $result = mysqli_query($conn,$querry); 

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

    
    $querry = "INSERT INTO risk_two(ref_id, JsonData) VALUES ('$ref_id', '$JsonData')";

    $result = mysqli_query($conn,$querry); 

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

    $noi =  $_POST['noi'];
    $EMI =  $_POST['EMI'];

    
    $querry = "INSERT INTO addinfo(ref_id, JsonData) VALUES ('$ref_id', '$JsonData')";

    $result = mysqli_query($conn,$querry); 

    $querry2 = "UPDATE net_worth SET c_months='$noi',c_emi='$EMI' WHERE ref_id=".$_POST['ref_id'];

    $result2 = mysqli_query($conn,$querry2); 

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
    $target_dir = "uploads/";
    $target_file = time().basename($_FILES["file"]["name"]);
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


if($_POST['action'] == 'deleteMediaFile'){
    $result = mysqli_query($conn, "DELETE FROM media Where id=".$_POST['id']);
    echo $result;
}

if($_POST['action'] == 'getDoc1Data'){
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
    echo json_encode($response);
}

if($_POST['action']  == 'deleteAppDataList'){
    $result = mysqli_query($conn, "DELETE FROM app_data Where id=".$_POST['id']);
    echo $result;
}

if($_POST['action'] == 'scoreSubmit'){
 
    $ref_id =  $_POST['ref_id'];

    $JsonData =  $_POST['JsonData'];

    $m_score =  $_POST['m_score'];

    $total1 =  $_POST['total1'];

    $total2 =  $_POST['total2'];

    
    $querry = "INSERT INTO score(ref_id, m_score,total1,total2) VALUES ('$ref_id', '$m_score', '$total1', '$total2')";

    $result = mysqli_query($conn,$querry); 

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
    $res_header = mysqli_query($conn, "SELECT * FROM users");
    while ($row_header = mysqli_fetch_assoc($res_header)) {
        $response[] = $row_header;
    
    }
    echo json_encode($response);
}


if($_POST['action'] == 'addUser'){

    $f_name =  $_POST['f_name'];
    $l_name =  $_POST['l_name'];
    $email =  $_POST['email'];
    $password =  $_POST['password'];
    $type =  $_POST['type'];

    
    $querry = "INSERT INTO users(f_name, l_name,email,password,type) VALUES ('$f_name', '$l_name', '$email', '$password', '$type')";

    $result = mysqli_query($conn,$querry); 

    echo $result;
}

if($_POST['action']  == 'deleteUser'){
    $result = mysqli_query($conn, "DELETE FROM users Where id=".$_POST['id']);
    echo $result;
}

if($_POST['action']  == 'loginUser'){
    
    $email =  $_POST['email'];
    $password =  $_POST['password'];

    $quarry = "SELECT * FROM users Where email='$email' AND password='$password'";

    $result = mysqli_query($conn, $quarry);
 
    while ($row_header = mysqli_fetch_assoc($result)) {
        $response[] = $row_header;
    
    }
    echo json_encode($response);
}